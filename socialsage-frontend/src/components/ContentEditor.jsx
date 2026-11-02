import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

function escapeHtml(value) {
  return String(value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Small, safe Markdown renderer for the generated-content preview.
function markdownToHtml(markdown) {
  const lines = String(markdown || '').replace(/\r\n/g, '\n').split('\n');
  const output = [];
  let inList = false;
  let paragraph = [];

  const inline = (value) => escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');

  const closeList = () => { if (inList) { output.push('</ul>'); inList = false; } };
  const flushParagraph = () => {
    if (paragraph.length) {
      output.push('<p>' + inline(paragraph.join(' ')) + '</p>');
      paragraph = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) { flushParagraph(); closeList(); continue; }
    const heading = trimmed.match(/^(#{1,3})\s+(.+)$/);
    const bullet = trimmed.match(/^[-*]\s+(.+)$/);
    const numbered = trimmed.match(/^\d+[.)]\s+(.+)$/);
    if (heading) {
      flushParagraph(); closeList();
      const level = heading[1].length;
      output.push('<h' + level + '>' + inline(heading[2]) + '</h' + level + '>');
    } else if (bullet || numbered) {
      flushParagraph();
      if (!inList) { output.push('<ul>'); inList = true; }
      output.push('<li>' + inline((bullet || numbered)[1]) + '</li>');
    } else {
      closeList();
      paragraph.push(trimmed);
    }
  }
  flushParagraph(); closeList();
  return output.join('');
}

export default function ContentEditor({ content, onSave }) {
  const [editedContent, setEditedContent] = useState('');
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [mode, setMode] = useState('preview');
  const [copyMessage, setCopyMessage] = useState('');

  useEffect(() => {
    if (!content) return;
    const body = content.body || '';
    const firstHeading = body.match(/^\s*#\s+(.+)\s*$/m);
    const cleanBody = firstHeading ? body.replace(firstHeading[0], '').trim() : body;
    setTitle(content.title || firstHeading?.[1] || 'Untitled content');
    setEditedContent(cleanBody);
    setMode('preview');
  }, [content]);

  const previewHtml = useMemo(() => markdownToHtml(editedContent), [editedContent]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({ ...content, title, body: editedContent });
    } finally {
      setSaving(false);
    }
  };

  const handleCopy = async () => {
    const text = (title ? title + '\n\n' : '') + editedContent;
    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage('Copied');
      window.setTimeout(() => setCopyMessage(''), 1800);
    } catch {
      setCopyMessage('Copy unavailable');
    }
  };

  if (!content) return null;

  const buttonStyle = (active) => ({
    border: '1px solid ' + (active ? '#8b5cf6' : 'rgba(255,255,255,.14)'),
    background: active ? 'rgba(139,92,246,.18)' : 'transparent',
    color: active ? '#c4b5fd' : '#cbd5e1',
    borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 700
  });

  return (
    <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      style={{ background: '#fff', color: '#1f2937', border: '1px solid #e5e7eb', borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <div>
          <div style={{ color: '#6b7280', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em' }}>Your draft</div>
          <h2 style={{ margin: '4px 0 0', fontSize: 22, color: '#111827' }}>Review and publish</h2>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" onClick={() => setMode('preview')} style={buttonStyle(mode === 'preview')}>Preview</button>
          <button type="button" onClick={() => setMode('edit')} style={buttonStyle(mode === 'edit')}>Edit</button>
          <button type="button" onClick={handleCopy} style={{ ...buttonStyle(false), color: '#4f46e5' }}>{copyMessage || 'Copy draft'}</button>
          <button type="button" onClick={handleSave} disabled={saving} style={{ border: 0, background: '#6d3de0', color: '#fff', borderRadius: 8, padding: '9px 16px', fontWeight: 700, cursor: 'pointer', opacity: saving ? .6 : 1 }}>{saving ? 'Saving…' : 'Save'}</button>
        </div>
      </div>

      <label style={{ display: 'grid', gap: 6, color: '#4b5563', fontSize: 13, fontWeight: 700 }}>
        CONTENT TITLE
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add a clear title"
          style={{ width: '100%', boxSizing: 'border-box', padding: '12px 14px', border: '1px solid #d1d5db', borderRadius: 9, color: '#111827', fontSize: 18, fontWeight: 700 }} />
      </label>

      {mode === 'edit' ? (
        <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)}
          style={{ width: '100%', minHeight: 520, boxSizing: 'border-box', padding: 18, border: '1px solid #d1d5db', borderRadius: 10, color: '#111827', fontSize: 15, lineHeight: 1.75, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', resize: 'vertical' }} />
      ) : (
        <article className="generated-content-preview" style={{ minHeight: 320, padding: '22px 26px', border: '1px solid #e5e7eb', borderRadius: 10, color: '#273244', fontSize: 16, lineHeight: 1.8, overflowWrap: 'anywhere' }}>
          <style>{'.generated-content-preview h1,.generated-content-preview h2,.generated-content-preview h3{color:#111827;line-height:1.3;margin:1.5em 0 .55em}.generated-content-preview h1{font-size:2em}.generated-content-preview h2{font-size:1.5em}.generated-content-preview h3{font-size:1.2em}.generated-content-preview p{margin:.7em 0}.generated-content-preview ul{padding-left:1.5em}.generated-content-preview li{margin:.35em 0}.generated-content-preview strong{font-weight:700;color:#111827}.generated-content-preview code{background:#f3f4f6;padding:2px 5px;border-radius:4px}'} </style>
          <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
        </article>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, color: '#6b7280', fontSize: 13 }}>
        <span>{content.type || 'General'} · {mode === 'preview' ? 'Formatted preview' : 'Markdown editor'}</span>
        <span>{editedContent.trim() ? editedContent.trim().split(/\s+/).length : 0} words</span>
      </div>
    </motion.section>
  );
}
