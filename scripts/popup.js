function showBannerOnce() {
    const banner = document.getElementById("banner");

    // 如果已經看過，就不顯示
    //if (localStorage.getItem("bannerShown") === "true") return;

    if (window.innerWidth <= 768 && banner) {
        banner.style.display = "flex";

        // 關閉按鈕事件
        document.getElementById("closeBanner").onclick = () => {
            banner.style.display = "none";
            localStorage.setItem("bannerShown", "true");
        };
    }
}

// 手機裝置自動顯示
document.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth <= 768) {
        setTimeout(showBannerOnce, 1000); // 1 秒後顯示
    }
});