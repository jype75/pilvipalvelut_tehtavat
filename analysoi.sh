echo "Detected languages:" | tee
analysis_report.txt

find . -type f -name "*.py" | grep -q . && echo "- Python" | tee -a
analysis_report.txt
find . -type f -name "*.java" | grep -q . && echo "- Java" | tee -a
analysis_report.txt
find . -type f -name "*.js" | grep -q . && echo "- JavaScript"  | tee -a
analysis_report.txt
find . -type f -name "*.ts" | grep -q . && echo "- TypeScript" |  tee -a
analysis_report.txt

echo "" | tee -a analysis_report.txt
echo " Summary:" | tee -a analysis_report.txt
echo "Files count: $(find . -type f | wc -l)" | tee -a analysis_report.txt