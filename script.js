let intervalId;
let empire_index = 0;
const INTERVAL = 100
const DEFAULT_MEMBERS = [
    "ユーザー１",
    "ユーザー２",
    "ユーザー３",
    "ユーザー４",
    "Empire",
];
const COLORS = [
    'list-group-item-primary',
    'list-group-item-success',
    'list-group-item-warning',
    'list-group-item-danger',
    'list-group-item-info',
    'list-group-item-light'
];

const BTN_START_CLASS = "btn-primary";
const BTN_STOP_CLASS = "btn-danger";

/** docuemtn.querySelectorの短縮形 */
const dqs = selector => {
    return document.querySelector(selector);
};

/** documebnt.querySelectorAllの短縮形 */
const dqa = selector => {
    return document.querySelectorAll(selector);
};

let ol_members;
let delayCount;
let empire_name = "嘉手納正憲";
document.addEventListener("DOMContentLoaded", () => {
    ol_members = dqs("#ol_members");
    // 画面描画時
    if (DEFAULT_MEMBERS.length > 0) {
        // 初期メンバー設定
        let txt_names = dqs("#txt_names");
        for (let i = 0; i < DEFAULT_MEMBERS.length; i++) {
            txt_names.value += DEFAULT_MEMBERS[i] + "\n";
        }

    }
    dqs("#btn_start").addEventListener("click", (e) => {
        // スタートボタン押下時
        let member_list = getMemberList();
        let chk_choose_one = dqs("#chk_choose_one")
        if (member_list.length <= 1) {
            alert("メンバーは2人以上設定してください")
            return;
        }
        if (chk_choose_one.checked) {
            if (!intervalId) {
                startRoulette();
            } else {
                endRoulette();
            }
        } else {
            if (!intervalId) {
                // タイマー未起動時
                startRanking();
            } else {
                // タイマー起動時
                stopRanking();
            }
        }
    });

    dqs("#btn_clear").addEventListener("click", () => {
        // クリアボタン
        if (!intervalId) {
            // タイマー起動中は表示されないが
            // 仮に押せたとしても動かないように
            dqs("#div_result_msg").innerText = "";
            txt_names.value = "";
            ol_members.innerHTML = "";
        }
    });
});

function startRoulette() {
    console.log("Interval Start");
    dqs("#div_result_msg").innerText = "";

    change_start_btn(true);
    change_clear_btn_visibility(false);

    let member_list = getMemberList();
    ol_members.innerHTML = "";
    for (let i = 0; i < member_list.length; i++) {
        let member = member_list[i];
        let li_member = create_li(member, "list-group-item-primary");
        ol_members.appendChild(li_member);
    }

    ol_members.childNodes[0].classList.add("list-group-item-danger");
    intervalId = setInterval(change_target_li, INTERVAL);
}

function change_target_li() {
    let hit_li = dqs("#ol_members .list-group-item-danger");
    let next_li = hit_li.nextSibling;
    if (next_li == null) {
        next_li = ol_members.childNodes[0];
    }
    hit_li.classList.remove("list-group-item-danger");
    next_li.classList.add("list-group-item-danger");
}
let delay_num = 0;
function change_delay_target_li() {
    if (delayCount > 0) {
        change_target_li();
        delayCount--;
    } else {
        if (delay_num > 2) {
            delay_num = 0;
            clearInterval(intervalId);
            intervalId = null;
            change_start_btn(false);
            change_clear_btn_visibility(true);
            let hit_li = dqs("#ol_members .list-group-item-danger");
            complete_animation(hit_li.innerText)
        } else {
            console.log(delay_num);
            clearInterval(intervalId);
            intervalId = null;
            delay_num++;
            delayCount = Math.floor(Math.random() * 10)// + 10
            intervalId = setInterval(change_delay_target_li, 100 * (delay_num+1));

        }
    }
}

function endRoulette() {
    clearInterval(intervalId);
    delayCount = Math.floor(Math.random() * 10)// + 10

    intervalId = setInterval(change_delay_target_li, 300);
}

function startRanking() {
    console.log("Interval Start");
    dqs("#div_result_msg").innerText = "";
    change_start_btn(true);
    change_clear_btn_visibility(false);
    // タイマー起動
    intervalId = setInterval(create_ranking_ol, INTERVAL);
}

function stopRanking() {
    console.log("Interval Stopped");
    change_start_btn(false);
    change_clear_btn_visibility(true);
    // タイマー停止
    clearInterval(intervalId);
    intervalId = null;
    let top = dqs("li").innerText;
    complete_animation(top);
    // top_message = "おめでとうございます" + top + "!!!";
    // let empireNode = li_members[empire_index]

    // if (top == empire_name) {
    //     top_message = "Empireに栄光あれ！！！One for Empire, all for Empire"
    // } else if (dqs("#chk_empire_top").checked) {
    //     // 一人はEmpireのために、みんなはEmpireのために
    //     // One for Empire, all for Empire
    //     let topNode = li_members[0];
    //     topNode = ol_members.replaceChild(empireNode, topNode);
    //     ol_members.appendChild(topNode);
    //     top_message = "Empireに栄光あれ！！！One for Empire, all for Empire"
    // }
    // if (dqs("#chk_empire_all").checked) {
    //     // EmpireのEmpireによるEmpireのための政治
    //     // government of the Empire, by the Empire, for the Empire
    //     ol_members.innerHTML = ""
    //     for (let i = 0; i < li_members.length; i++) {
    //         ol_members.appendChild(create_li("Empire", COLORS[i]));
    //     }
    //     top_message = "全てはEmpireの為に！！ government of the Empire, by the Empire, for the Empire";
    // }
    // let anime_h1 = document.createElement("div");
    // anime_h1.classList.add("display-2");
    // anime_h1.innerText = top_message;
    // anime_h1.classList.add("animate__animated");
    // anime_h1.classList.add("animate__zoomInDown");
    // dqs("#div_result_msg").appendChild(anime_h1);

    // dqs("#div_result_msg").innerText = "おめでとうございます！";
}

function complete_animation(target_member) {
    let li_members = dqa(".list-group-item");
    console.log(empire_index);


    top_message = "おめでとうございます" + target_member + "!!!";
    let empireNode = li_members[empire_index]

    if (target_member == empire_name) {
        top_message = "Empireに栄光あれ！！！One for Empire, all for Empire"
    } else if (dqs("#chk_empire_top").checked) {
        // 一人はEmpireのために、みんなはEmpireのために
        // One for Empire, all for Empire
        let topNode = li_members[0];
        topNode = ol_members.replaceChild(empireNode, topNode);
        ol_members.appendChild(topNode);
        top_message = "Empireに栄光あれ！！！One for Empire, all for Empire"
    }
    if (dqs("#chk_empire_all").checked) {
        // EmpireのEmpireによるEmpireのための政治
        // government of the Empire, by the Empire, for the Empire
        ol_members.innerHTML = ""
        for (let i = 0; i < li_members.length; i++) {
            ol_members.appendChild(create_li("Empire", COLORS[i]));
        }
        top_message = "全てはEmpireの為に！！ government of the Empire, by the Empire, for the Empire";
    }
    let anime_h1 = document.createElement("div");
    anime_h1.classList.add("display-2");
    anime_h1.innerText = top_message;
    anime_h1.classList.add("animate__animated");
    anime_h1.classList.add("animate__zoomInDown");
    dqs("#div_result_msg").appendChild(anime_h1);

}

/**
 * 配列番号をランダムシャッフルする
 * @param {Array} index_list ArrayIndexのリスト
 * @returns ランダムシャッフルしたArrayIndexのリスト
 */
const list_random = index_list => {
    let len = index_list.length;
    while (len) {
        let j = Math.floor(Math.random() * len);
        let t = index_list[--len];
        index_list[len] = index_list[j];
        index_list[j] = t;

    }
    return index_list;
}

/**
 * olの内容を作成する
 */
function create_ranking_ol() {
    let member_list = getMemberList();
    let range = Array.from(Array(member_list.length)).map((v, i) => i);
    ol_members.innerHTML = "";
    let i = 0;
    let index_list = list_random(range);
    for (i; i < index_list.length; i++) {
        let index = index_list[i];
        let member = member_list[index];
        if (member == empire_name) {
            empire_index = i;
        }
        let color = COLORS[index];

        let li_member = create_li(member, color);
        ol_members.appendChild(li_member)
    }
}

/**
 * liのエレメントを作成する
 * @param {string} member メンバー名
 * @param {string} color 色クラス
 * @returns li Element
 */
function create_li(member, color) {
    let li_member = document.createElement("li");
    li_member.classList.add("list-group-item")
    li_member.classList.add(color);
    li_member.innerText = member;
    return li_member;
}

/**
 * textareaからメンバーを取得しリストで返す
 * @returns List of members
 */
function getMemberList() {
    let member = dqs("#txt_names").value.trim();
    let member_list = member.split(/\n/);
    return member_list;
}

function change_clear_btn_visibility(visibility) {

    let btn_clear = dqs("#btn_clear");
    if (visibility) {
        btn_clear.classList.remove("invisible");
        btn_clear.classList.add("visible");
    } else {
        btn_clear.classList.remove("visible");
        btn_clear.classList.add("invisible");
    }
}


function change_start_btn(isStart) {
    let btn_start = dqs("#btn_start");
    if (isStart) {
        btn_start.classList.remove(BTN_START_CLASS);
        btn_start.classList.add(BTN_STOP_CLASS);
        btn_start.innerText = "Stop";
    } else {
        btn_start.classList.remove(BTN_STOP_CLASS);
        btn_start.classList.add(BTN_START_CLASS);
        btn_start.innerText = "Start";
    }
}
