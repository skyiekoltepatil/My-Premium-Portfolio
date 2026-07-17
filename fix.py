import sys

path = './src/components/StickerDrag.tsx'
with open(path, 'r') as f:
    text = f.read()

text = text.replace('\\${', '${')
text = text.replace('\\`', '`')

with open(path, 'w') as f:
    f.write(text)
print("Done fixing file")
