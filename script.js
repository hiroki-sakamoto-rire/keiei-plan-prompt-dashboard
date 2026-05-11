const form = document.querySelector("#planForm");
const promptText = document.querySelector("#promptText");
const copyButton = document.querySelector("#copyPrompt");
const currentUrl = document.querySelector("#currentUrl");
const tabs = document.querySelectorAll(".tab");
const views = document.querySelectorAll(".output-view");

const fallback = {
  companyName: "顧問先企業",
  business: "未入力",
  strength: "未入力",
  purpose: "新規融資の申込",
  fundUse: "未入力",
  bankConcern: "未入力",
  sales: "未入力",
  profit: "未入力",
  debt: "未入力",
  goal: "未入力",
};

function getValue(name) {
  const field = form.elements[name];
  const value = field ? field.value.trim() : "";
  return value || fallback[name];
}

function buildPrompt() {
  const data = {
    companyName: getValue("companyName"),
    business: getValue("business"),
    strength: getValue("strength"),
    purpose: getValue("purpose"),
    fundUse: getValue("fundUse"),
    bankConcern: getValue("bankConcern"),
    sales: getValue("sales"),
    profit: getValue("profit"),
    debt: getValue("debt"),
    goal: getValue("goal"),
  };

  return `あなたは中小企業金融と事業再生に詳しい財務コンサルタントです。
以下の顧問先が金融機関に提出する「経営計画書」のたたき台を作成してください。

【目的】
${data.purpose}

【顧問先】
会社名：${data.companyName}
業種・事業内容：
${data.business}

代表者の考え・強み：
${data.strength}

【資金使途】
${data.fundUse}

【金融機関に安心してほしいポイント】
${data.bankConcern}

【直近の数値】
売上：${data.sales}
利益：${data.profit}
借入・返済状況：${data.debt}

【今後3年の目標】
${data.goal}

【作成してほしい内容】
1. 金融機関が読みやすい、誠実で具体的な文体にしてください。
2. 「会社概要」「現状分析」「経営課題」「改善施策」「3か年数値計画の考え方」「返済原資」「実行管理」の順で作成してください。
3. 数値が不足している箇所は、勝手に断定せず「確認が必要」と明記してください。
4. 金融機関が重視する、返済可能性・資金使途の妥当性・改善施策の実行可能性が伝わるようにしてください。
5. 最後に、追加で確認すべき資料と質問を箇条書きで出してください。

【出力形式】
- 見出し付きの経営計画書ドラフト
- 3か年計画に入れるべき数値項目の表
- 金融機関面談で説明する要点
- 追加確認事項`;
}

function refreshPrompt() {
  promptText.textContent = buildPrompt();
}

form.addEventListener("input", refreshPrompt);
form.addEventListener("change", refreshPrompt);

currentUrl.textContent = window.location.href;

copyButton.addEventListener("click", async () => {
  await navigator.clipboard.writeText(promptText.textContent);
  copyButton.textContent = "コピーしました";
  setTimeout(() => {
    copyButton.textContent = "プロンプトをコピー";
  }, 1400);
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;
    tabs.forEach((item) => item.classList.toggle("active", item === tab));
    views.forEach((view) => view.classList.toggle("active", view.id === target));
  });
});

refreshPrompt();
