import { useState } from 'react';
import './App.css';
import spreadLogo from './assets/Spread_Logo_Orange.png';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    phone: '',
    email: '',
    photo: null,
    photoPreview: null
  });

  const [copied, setCopied] = useState(false);

  // SVG Icons as data URIs for email compatibility
  const phoneIconDataUri = 'data:image/svg+xml;base64,' + btoa(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" fill="#FF6F47"/></svg>`);

  const emailIconDataUri = 'data:image/svg+xml;base64,' + btoa(`<svg width="14" height="11" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 0h18a3 3 0 013 3v12a3 3 0 01-3 3H3a3 3 0 01-3-3V3a3 3 0 013-3zm18 2H3a1 1 0 00-1 1v.817l10 5.263 10-5.263V3a1 1 0 00-1-1zm1 4.183l-10 5.263-10-5.263V15a1 1 0 001 1h18a1 1 0 001-1V6.183z" fill="#FF6F47"/></svg>`);

  const linkedInIconDataUri = 'data:image/svg+xml;base64,' + btoa(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#FF6F47"/></svg>`);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photo: file,
          photoPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const copySignature = async () => {
    const signatureElement = document.getElementById('signature-preview');

    try {
      // Create a new div to hold the signature HTML
      const htmlContent = signatureElement.innerHTML;

      // Copy as HTML for Outlook
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const data = [new ClipboardItem({ 'text/html': blob })];

      await navigator.clipboard.write(data);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to copy signature. Please try selecting and copying manually.');
    }
  };

  return (
    <div className="app-container">
      <div className="form-section">
        <h1>Email Signature Generator</h1>
        <p className="subtitle">Create your SPREAD email signature</p>

        <form className="signature-form">
          <div className="form-group">
            <label htmlFor="photo">Photo Upload *</label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handlePhotoUpload}
              required
            />
            {formData.photoPreview && (
              <div className="photo-preview-small">
                <img src={formData.photoPreview} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Constanze Hüppe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Job Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Enterprise Lead"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="e.g., +49 151 55380231"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="e.g., yourname@spread.ai"
              required
            />
          </div>

          <button
            type="button"
            onClick={copySignature}
            className="copy-button"
            disabled={!formData.name || !formData.email}
          >
            {copied ? "✓ Copied!" : "Copy Signature for Outlook"}
          </button>
        </form>
      </div>

      <div className="preview-section">
        <h2>Preview</h2>
        <div className="preview-wrapper">
          <div id="signature-preview" className="signature">
            <table
              cellPadding="0"
              cellSpacing="0"
              style={{
                width: "600px",
                height: "200px",
                backgroundColor: "#FFFFFF",
                fontFamily: "Arial, sans-serif",
                position: "relative",
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      width: "140px",
                      verticalAlign: "top",
                      padding: "20px",
                    }}
                  >
                    <table
                      cellPadding="0"
                      cellSpacing="0"
                      style={{ width: "100%" }}
                    >
                      <tbody>
                        <tr>
                          <td>
                            {formData.photoPreview ? (
                              <img
                                src={formData.photoPreview}
                                alt={formData.name}
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  borderRadius: "2px",
                                  objectFit: "cover",
                                  display: "block",
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  backgroundColor: "#f0f0f0",
                                  borderRadius: "2px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "12px",
                                  color: "#999",
                                }}
                              >
                                Photo
                              </div>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ paddingTop: "8px" }}>
                            <img
                              src={spreadLogo}
                              alt="SPREAD"
                              style={{
                                width: "92px",
                                height: "20px",
                                display: "block",
                              }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td
                    style={{
                      width: "1px",
                      backgroundColor: "#FF6F47",
                      padding: "0",
                    }}
                  ></td>
                  <td style={{ verticalAlign: "top", padding: "20px" }}>
                    <div style={{ marginBottom: "15px" }}>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "900",
                          color: "#000000",
                          marginBottom: "5px",
                          lineHeight: "18px",
                          fontFamily: "'DIN Pro', 'Arial', sans-serif",
                        }}
                      >
                        {formData.name || "Your Name"}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          color: "#000000",
                          lineHeight: "15px",
                          fontFamily: "'DIN Pro', 'Arial', sans-serif",
                        }}
                      >
                        {formData.title || "Your Title"}
                      </div>
                    </div>

                    <table
                      cellPadding="0"
                      cellSpacing="0"
                      style={{ marginBottom: "15px" }}
                    >
                      <tbody>
                        <tr>
                          <td
                            style={{
                              paddingRight: "5px",
                              verticalAlign: "middle",
                            }}
                          >
                            <img
                              src={phoneIconDataUri}
                              alt="Phone"
                              style={{
                                width: "14px",
                                height: "14px",
                                display: "block",
                              }}
                            />
                          </td>
                          <td
                            style={{
                              paddingRight: "15px",
                              verticalAlign: "middle",
                              fontSize: "12px",
                              color: "#000000",
                              fontFamily: "'DIN Pro', 'Arial', sans-serif",
                            }}
                          >
                            {formData.phone || "+49 XXX XXXXXXXX"}
                          </td>
                          <td
                            style={{
                              paddingRight: "5px",
                              verticalAlign: "middle",
                            }}
                          >
                            <img
                              src={emailIconDataUri}
                              alt="Email"
                              style={{
                                width: "14px",
                                height: "11px",
                                display: "block",
                              }}
                            />
                          </td>
                          <td
                            style={{
                              paddingRight: "15px",
                              verticalAlign: "middle",
                              fontSize: "12px",
                              color: "#000000",
                              fontFamily: "'DIN Pro', 'Arial', sans-serif",
                            }}
                          >
                            {formData.email || "email@spread.ai"}
                          </td>
                          <td style={{ verticalAlign: "middle" }}>
                            <a
                              href="https://www.linkedin.com/company/spread-ai/posts/"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ display: "block", lineHeight: "0" }}
                            >
                              <img
                                src={linkedInIconDataUri}
                                alt="LinkedIn"
                                style={{
                                  width: "14px",
                                  height: "14px",
                                  display: "block",
                                }}
                              />
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "700",
                        color: "#000000",
                        marginBottom: "5px",
                        lineHeight: "15px",
                        fontFamily: "'DIN Pro', 'Arial', sans-serif",
                      }}
                    >
                      SPREAD GmbH
                      <br />
                      <span style={{ fontWeight: "400" }}>
                        Köpenicker Str. 40c | 10179 Berlin
                      </span>
                    </div>

                    <div
                      style={{
                        fontSize: "9px",
                        fontWeight: "400",
                        color: "#000000",
                        lineHeight: "11px",
                        marginTop: "5px",
                        fontFamily: "'DIN Pro', 'Arial', sans-serif",
                      }}
                    >
                      Stay connected—follow us on LinkedIn for the latest
                      insights and updates
                      <br />
                      Sitz der Gesellschaft: Frankfurt; eingetragen im
                      Amtsgericht Frankfurt a.M. HRB 116653
                      <br />
                      Geschäftsführung: Philipp Noll, Robert Göbel
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="preview-note">
          This is how your signature will appear in Outlook emails
        </p>
      </div>
    </div>
  );
}

export default App;
