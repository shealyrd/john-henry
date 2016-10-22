del combined.js
del compiled.js
dir /B /S *.ts > libs.txt
call tsc @libs.txt --out compiled.js
del libs.txt