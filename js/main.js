"use strict";

{
    const words = [
        'apple',
        'sky',
        'blue',      //一覧 単語
        'middle',
        'set',
    ];

    let word;
    let loc;
    let score;
    let miss;
    const timeLimit = 3 * 1000; //タイムの設定
    let startTime;
    let isPlaying = false; //ゲームの始まりの確認

    const target = document.getElementById('target');
    const scoreLabel = document.getElementById('score');
    const missLabel = document.getElementById('miss');
    const timerLabel = document.getElementById('timer');


    function updateTarget() {
        let placeholder = ''; //格納するフォルダ
        for (let i = 0; i < loc; i++) {
            placeholder += '_';  //0からロケーション番号までアンダーバーを更新する
        }
        target.textContent = placeholder + word.substring(loc);  //部分文字列
    }

    function updateTimer() {
        const timeLeft = startTime + timeLimit - Date.now(); //現在時刻と制限時間を算出
        timerLabel.textContent = (timeLeft / 1000).toFixed(2); //timerLabelにセッッと

        const timeoutId = setTimeout(() => {
            updateTimer(); //カウントダウン
        }, 10);

        if (timeLeft < 0) {
            isPlaying = false;
            clearTimeout(timeoutId); //タイム逆算をしなくする
            timerLabel.textContent = 0.00; //タイムをしっかり測る
            setTimeout(() => {      //こことしたの100でalertのタイマのずれを調整している
                showResult();
            }, 100);

            target.textContent = 'click to replay';
        }
    }


    function showResult() {
        const accuracy = score + miss === 0 ? 0 :  score / (score + miss) * 100;
        alert(`${score} letters, ${miss} misses, ${accuracy.toFixed(2)}% accuracy!`); //最終に出る答え
    }

    window.addEventListener('click', () => { //windowを押した際次の動作をしなさい
        if (isPlaying === true) {
            return;
        }

        isPlaying = true;

        loc = 0;
        score = 0;
        miss = 0;
        scoreLabel.textContent = score;
        missLabel.textContent = miss;
        word = words[Math.floor(Math.random() * words.length)];

        target.textContent = word;
        startTime =Date.now(); //現在のタイム時刻を測ってくれる
        updateTimer();
    });

    window.addEventListener('keydown', e => {  //キーを押し込んだと言う意味
        if (isPlaying !== true) {
            return;
        }
        console.log(e.key); //宣言
       if (e.key === word[loc]) { //条件分岐
           console.log('score');
           loc++;
           if (loc === word.length) {
            words = words[Math.floor(Math.random() * words.length)];
            loc = 0;
           }
           updateTarget();
           score++;
           scoreLabel.textContent = score; //スコアのカウント数
       } else {
           console.log('miss')
           miss++;
           missLabel.textContent = miss; //ミスのカウント数
       } 
    });
}

