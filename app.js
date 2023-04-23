// Firebaseの設定を初期化する
var firebaseConfig = {
    // Firebaseコンソールで表示される設定をコピーして貼り付ける
};
firebase.initializeApp(firebaseConfig);

// Firebase Realtime Databaseへの参照を取得する
var database = firebase.database();

// ボタンと入力欄を取得する
var saveButton = document.getElementById('save-button');
var loadButton = document.getElementById('load-button');
var userIdInput = document.getElementById('user-id');
var memoInput = document.getElementById('memo');

// メモを保存する関数
function saveMemo() {
    var userId = userIdInput.value;
    var memo = memoInput.value;
    if (userId && memo) {
        // ユーザーIDに紐付けてメモを保存する
        database.ref('memos/' + userId).set(memo);
        alert('メモを保存しました！');
    } else {
        alert('ユーザーIDとメモを入力してください');
    }
}

// メモを読み込む関数
function loadMemo() {
    var userId = userIdInput.value;
    if (userId) {
        // ユーザーIDに紐付けられたメモを取得する
        database.ref('memos/' + userId).once('value').then(function(snapshot) {
            var memo = snapshot.val();
            if (memo) {
                memoInput.value = memo;
                alert('メモを読み込みました！');
            } else {
                alert('メモが見つかりませんでした');
            }
        });
    } else {
        alert('ユーザーIDを入力してください');
    }
}

// ボタンのクリックイベントを登録する
saveButton.addEventListener('click', saveMemo);
loadButton.addEventListener('click', loadMemo);
