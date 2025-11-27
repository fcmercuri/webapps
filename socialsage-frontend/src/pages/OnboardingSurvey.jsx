export default function OnboardingSurvey() {
    return (
      <section style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="card" style={{ maxWidth: 480, width: "100%" }}>
          <h1 style={{ marginBottom: 20 }}>Welcome! Let's get to know you.</h1>
          <form>
            <input placeholder="Company Name" required />
            <input placeholder="Industry" required />
            <select required>
              <option value="">Your Goal</option>
              <option>Brand Awareness</option>
              <option>Lead Generation</option>
              <option>Sales/Conversion</option>
            </select>
            <button className="cta" style={{ width: "100%" }}>Continue</button>
          </form>
        </div>
      </section>
    );
  }
  