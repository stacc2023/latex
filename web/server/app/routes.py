from flask import Flask, request, jsonify, send_file, abort
from flask_cors import CORS
import os  
import subprocess

app = Flask(__name__)
CORS(app)



def compile_latex(tex_file):
    '''
    Compile LaTeX file to PDF using pdflatex
    '''
    try:
        #Run pdflatex command
        result = subprocess.run(['pdflatex', '--interaction', 'nonstopmode', '-halt-on-error', '-file-line-error', '-output-directory', 'pdf', tex_file], stdin=subprocess.DEVNULL, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        if result.returncode != 0:
            #Print stderr output
            print(f"Error compiling LaTeX: {result.stdout.decode('utf-8')}")
            raise Exception('LaTeX compiling error')
    except Exception as e:
        print(f"Error compiling LaTeX: {e}")
        raise Exception('LaTeX compiling error')

# get file list once page loaded
@app.route('/files', methods=['GET'])
def get_files():
    files = os.listdir('./tex')
    return jsonify(files)

# get file contents when an user clicks file name on sidebar
@app.route('/file/<filename>', methods=['GET'])
def get_file(filename):
    directory = './tex/' + filename
    if os.path.exists(directory):
        return send_file(directory, as_attachment=True)
    else:
        abort(500)

@app.route('/text', methods=['POST'])
def index():
    data = request.json
    url = data.get('url')
    text = data.get('contents')

    f = open('tex/' + url,'w')
    f.write(text)
    f.close()

    try:
        compile_latex('tex/' + url)
        return send_file('pdf/' + url.split('.')[0] + '.pdf', as_attachment=True)
    except Exception as e:
        abort(500)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3002)

