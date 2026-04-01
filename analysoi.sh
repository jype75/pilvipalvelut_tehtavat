echo "=== Analyysiraportti ===" | tee analysis_report.txt

echo "" | tee -a analysis_report.txt
echo "Havaitut ohjelmointikielet:" | tee analysis_report.txt

find . -type f -name "*.py" | grep -q . && echo "- Python" | tee -a analysis_report.txt
find . -type f -name "*.java" | grep -q . && echo "- Java" | tee -a analysis_report.txt
find . -type f -name "*.js" | grep -q . && echo "- JavaScript"  | tee -a analysis_report.txt
find . -type f -name "*.ts" | grep -q . && echo "- TypeScript" |  tee -a analysis_report.txt

echo "" | tee -a analysis_report.txt
echo "Havaitut suunnittelumallit:" | tee -a analysis_report.txt

grep -R "getInstance" -n . && echo "- Singleton" >> analysis_report.txt
grep -R "create[A-Z]" -n . && echo "- Factory Method" >> analysis_report.txt
grep -R "notify" -n . && echo "- Observer" >> analysis_report.txt
grep -R "Strategy" -n . && echo "- Strategy" >> analysis_report.txt
grep -R "Decorator" -n . && echo "- Decorator" >> analysis_report.txt

echo "" | tee -a analysis_report.txt
echo " Yhteenveto (Summary):" | tee -a analysis_report.txt
echo "Tiedostojen määrä: $(find . -type f | wc -l)" | tee -a analysis_report.txt

