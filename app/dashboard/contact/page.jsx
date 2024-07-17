"use client"
import { useState } from 'react';

const Contact = () => {
    const [result, setResult] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);
    
        formData.append("access_key", "EMAIL_ACCESS_KEY_ID");
    
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
    
        const data = await response.json();
    
        if (data.success) {
          setResult("Form Submitted Successfully");
          event.target.reset();
        } else {
          console.log("Error", data);
          setResult(data.message);
        }
    };

    return (
        <section className="contact">
            <style>
                {`
                    .contact {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        background: #826afb;
                        padding: 20px;
                    }

                    form {
                        max-width: 600px;
                        width: 100%;
                        background: #fff;
                        padding: 25px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0,0,0, .1);
                        color: #333;
                        margin: 25px;
                    }

                    form h2 {
                        font-size: 30px;
                        text-align: center;
                        margin-bottom: 20px;
                    }

                    form .input-box {
                        margin-bottom: 20px;
                    }

                    .input-box label {
                        display: block;
                        margin-bottom: 8px;
                        font-weight: bold;
                    }

                    .input-box .field {
                        width: 100%;
                        height: 50px;
                        background: transparent;
                        border: 2px solid #ddd;
                        outline: none;
                        border-radius: 6px;
                        padding: 15px;
                        font-size: 16px;
                        color: #333;
                    }

                    .input-box .field.mess {
                        height: 200px;
                        resize: none;
                    }

                    form button {
                        width: 100%;
                        height: 55px;
                        background: #826afb;
                        border: none;
                        border-radius: 6px;
                        box-shadow: 0 0 10px rgba(0,0,0, .1);
                        cursor: pointer;
                        font-size: 16px;
                        color: #fff;
                        font-weight: 500;
                        margin-top: 25px;
                        transition: 0.5s;
                    }

                    form button:hover {
                        background: #624ec6;
                    }

                    .result {
                        margin-top: 20px;
                        text-align: center;
                        font-size: 18px;
                    }

                    @media (max-width: 600px) {
                        .contact {
                            padding: 10px;
                        }

                        form {
                            padding: 15px;
                        }

                        form h2 {
                            font-size: 24px;
                        }

                        .input-box .field, .input-box .field.mess {
                            padding: 10px;
                            font-size: 14px;
                        }

                        form button {
                            height: 45px;
                            font-size: 14px;
                        }
                    }
                `}
            </style>
            <form onSubmit={onSubmit}>
                <h2>Contact Form</h2>
                <div className="input-box">
                    <label>Full Name</label>
                    <input type="text" name="name" placeholder="Enter your name" required />
                </div>
                <div className="input-box">
                    <label>Email Address</label>
                    <input type="email" name="email" placeholder="Enter your email" required />
                </div>
                <div className="input-box">
                    <label>Your Message</label>
                    <textarea name="message" className="field mess" placeholder="Enter your message" required></textarea>
                </div>
                <button type="submit">Send Message</button>
                <div className="result">{result}</div>
            </form>
        </section>
    );
};

export default Contact;
