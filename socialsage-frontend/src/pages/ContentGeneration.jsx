export default function ContentGeneration() {
    return (
      <section>
        <div className="card" style={{ maxWidth: 650, margin: "2rem auto" }}>
          <h1>AI Content Generation</h1>
          <form>
            <textarea placeholder="Describe what you want to generate…" rows={5} />
            <button className="cta" type="submit" style={{ width: "100%" }}>Generate Now</button>
          </form>
        </div>
      </section>
    );
  }
  