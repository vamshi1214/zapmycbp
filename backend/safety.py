''''from flask import Flask, request, jsonify, send_file
from docx import Document
from docx.shared import Pt, RGBColor, Inches
from docx.enum.text import WD_PARAGRAPH_ALIGNMENT, WD_UNDERLINE, WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
import google.generativeai as genai
from docx import Document
from docx.shared import Pt
import datetime
import os

app = Flask(__name__)

# ... (Your existing code for genai configuration, functions, etc.  Paste your code here) ...
# Configure Gemini API
genai.configure(api_key="AIzaSyBTMexQW4idhwwn80T94PEUdqCS3E0yPJA")
model = genai.GenerativeModel('gemini-pro')


#### Date
# Get the current year and format it as "YYYY-YYYY+1"
current_year = datetime.datetime.now().year
formatted_year = f"{current_year}-{current_year + 1}"


@app.route('/generate_report', methods=['POST'])
def generate_report():
    try:
        data = request.get_json()

        # Extract data from JSON
        st_1 = data.get('st_1')
        st_2 = data.get('st_2')
        # ... (Extract all other inputs similarly) ...

        # Call your create_project_report function
        llm_output = {
            "Abstract": abstract,
            "Introduction": introduction,
            "Objectives": objectives,
            "Methodology": methodology,
            "Code": codi,
            "Conclusion": conclusion
        }
        create_project_report(llm_output)  #This should create a file


        # Send the generated file to the frontend
        return send_file("Real_Time_Audio_Streaming_TCP.docx", as_attachment=True, download_name="report.docx")

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True) # Set debug=False for production




    ############################################################################################
<!DOCTYPE html>
<html>
<head>
<title>Project Report Generator</title>
</head>
<body>
    <h1>Project Report Generator</h1>

    <form id="reportForm">
        <label for="st_1">Student 1 Name:</label><br>
        <input type="text" id="st_1" name="st_1"><br>
        <label for="r_1">Student 1 Roll No:</label><br>
        <input type="text" id="r_1" name="r_1"><br>
        <!-- Add input fields for all other inputs -->
        <button type="submit">Generate Report</button>
    </form>

    <div id="reportDownload"></div>

    <script>
        const form = document.getElementById('reportForm');
        const downloadDiv = document.getElementById('reportDownload');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = {};
            //Gather Data from Form
            formData.st_1 = document.getElementById("st_1").value;
            formData.r_1 = document.getElementById("r_1").value;
            //Gather all the remaining form data
            const response = await fetch('/generate_report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'report.docx';
                a.click();
                window.URL.revokeObjectURL(url);
                downloadDiv.innerHTML = '<p>Report generated successfully!</p>';
            } else {
                const data = await response.json();
                downloadDiv.innerHTML = `<p>Error: ${data.error}</p>`;
            }
        });
    </script>
</body>
</html>'''