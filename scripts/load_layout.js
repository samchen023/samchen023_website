// 這是定義函式，一定要放在最前面
function loadHTML(id, url, callback) {
    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error(`無法載入 ${url}`);
            return res.text();
        })
        .then(html => {
            document.getElementById(id).innerHTML = html;
            if (typeof callback === 'function') callback();
        })
        .catch(err => console.error(err));
}

// 當 DOM 載入完成時執行
document.addEventListener("DOMContentLoaded", () => {
    loadHTML("header", "../includes/header.html", () => {

        // 綁定手機選單 toggle
        const toggleBtn = document.getElementById("menuToggle");
        const sideMenu = document.getElementById("sideMenu");

        if (toggleBtn && sideMenu) {
            // 定義一個關閉選單的函式
            function closeMenuOnClickOutside(e) {
                if (
                    sideMenu.classList.contains("open") &&
                    !sideMenu.contains(e.target) &&
                    e.target !== toggleBtn
                ) {
                    sideMenu.classList.remove("open");
                    document.removeEventListener("click", closeMenuOnClickOutside);
                }
            }

            toggleBtn.onclick = (e) => {
                e.stopPropagation(); // 防止事件冒泡
                sideMenu.classList.toggle("open");
                if (sideMenu.classList.contains("open")) {
                    setTimeout(() => { // 延遲註冊，避免立即觸發
                        document.addEventListener("click", closeMenuOnClickOutside);
                    }, 0);
                } else {
                    document.removeEventListener("click", closeMenuOnClickOutside);
                }
            };
        }

        // 套用 active 樣式
        const links = document.querySelectorAll("#sideMenu a");
        const currentPage = window.location.pathname.split("/").pop();
        links.forEach(link => {
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("active");
            }
        });
    });

    // 載入 footer
    loadHTML("footer", "includes/footer.html");
    // 或是：
    // loadHTML("footer", "../includes/footer.html");
});
