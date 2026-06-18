import zipfile, re, sys
path = r"D:\zeray's files\HELEN ZERAY , Biography.docx"
with zipfile.ZipFile(path) as z:
    xml = z.read('word/document.xml').decode('utf-8')
text = re.sub(r'<[^>]+>', ' ', xml)
print(re.sub(r'\s+', ' ', text).strip())
