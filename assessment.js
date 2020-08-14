'use strict';
// htmlから要素取得
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素のこどもを全て削除する
 * @param {HTMLElement} element HTLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) { // こどもの要素があるかぎり削除
        element.removeChild(element.firstChild);
    }
}

// Enterキー押下時、診断ボタンクリックと同じ処理を実行
userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter'){
        assessmentButton.onclick();
    }
}

// ボタン押下時の処理
assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0){
        return; //名前が空の時はonclick処理終了
    }
    
    // TODO 診断結果表示エリアの作成
    removeAllChildren(resultDivided); // 前の診断結果を削除
    const header = document.createElement('h3'); //<h3></h3>作成
    header.innerText = '診断結果';
    resultDivided.appendChild(header); //<h3>を<div>の子要素に追加

    const paragraph = document.createElement('p'); //<p></p>作成
    const result = assessment(userName); // 診断関数の呼び出し
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph); //<p>を<div>の子要素に追加

    // TODO ツイートエリアの作成
    removeAllChildren(tweetDivided); // ツイートエリアの削除
    const anchor = document.createElement('a'); //<a></a>作成
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
      + encodeURIComponent('あなたのいいところ')
      + '&ref_src=twsrc%5Etfw';
    
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor); //<a>を<div>の子要素に追加

    const script = document.createElement('script');
    //Twitterサーバー上にあるスクリプトwidgets.jsを読み込み→ボタンイメージが表示される
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script); //<script>を<div>の子要素に追加
};

const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];


/**　　※このスタイルのコメント記述方法をJSDocという
 * 名前の文字列を渡すと診断結果を返す関数 ← 関数の説明
 * @param {string} userName ユーザの名前 ← 引数の説明
 * @return {string} 診断結果 ← 返却値の説明
 */

function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    //文字のコード番号の合計を回答（answers）の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    // {userName}をユーザーの名前に置き換える
    // {を文字として認識させるために\を付けている
    result = result.replace(/\{userName\}/g, userName + 'さん');
    return result;
}

// テストコード
console.assert(
    assessment('太郎') === '太郎さんのいいところは決断力です。太郎さんがする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
  console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );