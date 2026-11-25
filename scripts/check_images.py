import json
import os

arts = json.load(open('src/data/blog/articles.json', encoding='utf-8'))
for a in arts:
    slug = a['slug']
    url = a.get('cover_image_url', '')
    local_path = os.path.join('public', url.lstrip('/'))
    exists = os.path.exists(local_path)
    size = os.path.getsize(local_path) if exists else 0
    status = "OK" if exists and size > 0 else "MISSING!"
    print(f"[{status}] {slug[:35]:35} -> {url:45} ({size} bytes)")
