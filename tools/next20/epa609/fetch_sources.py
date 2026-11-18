"""Cache primary source documents outside the repository; no question material."""
import hashlib
import json
from pathlib import Path
import urllib.request
CACHE=Path('/Users/johnbrophy/tigertest-next20-progress/epa609-research')
SOURCES={
'programs':'https://www.epa.gov/mvac/section-609-technician-training-and-certification-programs',
'macs2025':'https://macsmobileairclimate.org/wp-content/uploads/2025/01/MACS-609-CertTrainingManual-2025.pdf',
'macs-format':'https://macsmobileairclimate.org/about-609-certification/',
'cfr82b':'https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-82/subpart-B',
'servicing':'https://www.epa.gov/mvac/regulatory-requirements-mvac-system-servicing',
'overlap':'https://www.epa.gov/section608/section-608-and-section-609-overlap',
'impacts':'https://www.epa.gov/mvac/acceptable-refrigerants-and-their-impacts',
'equipment':'https://www.epa.gov/mvac/certified-equipment',
'fittings':'https://www.epa.gov/mvac/unique-fittings-and-label-colors',
'retrofit':'https://www.epa.gov/mvac/choosing-and-using-retrofit-refrigerant-cfc-12-mvac',
'sales':'https://www.epa.gov/section608/refrigerant-sales-restriction',
}
if __name__=='__main__':
    CACHE.mkdir(parents=True,exist_ok=True)
    manifest=[]
    for key,url in SOURCES.items():
        try:
            data=urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=30).read()
            if b'<title>Federal Register :: Request Access</title>' in data:
                raise RuntimeError('Access challenge; actual text was read with web tool')
            name=key+('.pdf' if url.endswith('.pdf') else '.html')
            (CACHE/name).write_bytes(data)
            manifest.append({'id':key,'url':url,'fetched':'2026-11-18','file':name,'sha256':hashlib.sha256(data).hexdigest()})
            print(key,len(data))
        except Exception as e:
            manifest.append({'id':key,'url':url,'fetched':'2026-11-18','error':str(e),'note':'Web tool successfully fetched/read this page; local cache unavailable.'})
            print(key,str(e))
    (CACHE/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
