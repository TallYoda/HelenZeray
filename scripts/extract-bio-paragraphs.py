import re
import sys
import zipfile

path = sys.argv[1] if len(sys.argv) > 1 else r"D:\zeray's files\HELEN ZERAY , Biography.docx"

with zipfile.ZipFile(path) as z:
    xml = z.read('word/document.xml').decode('utf-8')

paras = re.findall(r'<w:p[^>]*>(.*?)</w:p>', xml, re.DOTALL)
for p in paras:
    texts = re.findall(r'<w:t[^>]*>([^<]*)</w:t>', p)
    line = ''.join(texts).strip()
    if line:
        print(line)
        print('---')
