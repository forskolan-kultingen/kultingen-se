#!/bin/sh
# Hämtar bilderna från nuvarande kultingen.se (Squarespace) till site/img.
# Squarespace skalar själv via ?format=<w>w, så vi tar 750w och 1500w av
# samma original i stället för att skala om lokalt. Med Accept: image/webp
# svarar Squarespace med WebP (med alfakanal där originalet är PNG).
# Körs en gång för hand; resultatet är incheckat. Se CONTENT.md för var
# varje bild används.
set -eu
cd "$(dirname "$0")/site/img"
base=https://images.squarespace-cdn.com/content/v1/5aa58fa096d45543aa042db8
while read -r path name; do
  [ -n "$path" ] || continue
  for w in 750 1500; do
    curl -sfL -H "Accept: image/webp" "$base/$path?format=${w}w" -o "$name-$w.webp"
  done
done <<'EOF'
5c63f437-4ba0-4094-ba38-3e63d86e6cf9/Namnlo%CC%88st-12.jpg logo
1633255184014-ZEC8XJCCMGNIU810DLZM/Kultingen+maj+sol.png lek-pa-var-lummiga-gard
1633292262314-JG4SLRI6TAHOLC6OW104/Valkommen+copy.png valkommen
15d475fc-dd34-426c-9771-fb90d5976edd/6BB7CB05-29EF-4EA0-A242-8488E5018583.jpg sapbubblor-gatan
e7e67644-1dee-420e-b07b-9a457bcf481a/477AB271-7126-4177-BBCB-A550170F3FC5.jpg lera
1619469369164-3ZUVR9QU363WPJWTN9SS/Matteh%C3%A4star.jpeg mattehastar
1619469371269-IKJBY98XQMNRYTMY8588/%C3%A5rtaviken.jpg artaviken
1619469390141-1WMQ3PPF0ZAADOBXSECM/s%C3%A5pbubblor.jpg sapbubblor
1619469404057-E8UE73854F52DU5C05ZC/stj%C3%A4rtlapp.jpeg stjartlapp
1619469403632-53B3R3YHELGTAQE69YPU/Vattenlek.jpg vattenlek
1619469411481-BAVOH68RLLJW0SMRNWFE/naturvetenskap.jpg naturvetenskap
1619469415376-0CROQCB2VEYO4I9JBVUE/uteexperiment.jpeg uteexperiment
1619469422428-9K2Y1VG2HFDCTTMAZGB7/p%C3%A5sk.jpg pask
1619469440480-DP4F6V8JWI79NYRHUQ9D/Mulle.jpg mulle
1619469433321-ZCW0OD6XUL9LI8TMULLZ/k%C3%A4nslor.jpg kanslor
1619469441908-A56K90DCLS19JVYAILKH/Pyssel.jpg pyssel
30d97df2-01ac-4212-8dba-c1b51bf3f49e/Bild1.png gris
EOF
