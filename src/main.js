const $siteList = $(".siteList");
const $lastLi = $siteList.find(".list");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  {
    logo: "Z",
    url: "https://zhihu.com",
  },
  {
    logo: "J",
    url: "https://juejin.im",
  },
];
const simplifyUrl = (url) => {
  return (url = url
    .replace("http://", "")
    .replace("https://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""));
};
const render = () => {
  $siteList.find("li:not(.list)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
          
              <div class="site">
                  <div class="logo">${node.logo}</div>
                  <div class="close">
                  <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-guanbi"></use>
              </svg>
                  </div>
                  <div class="link">${simplifyUrl(node.url)}</div>
              </div>
          
        </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); // 阻止冒泡
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是什么？");
  if (url.indexOf("https") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0],
    logoType: "text",
    url: url,
  });
  render();
});
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap); //localStorage只能存字符串
  localStorage.setItem("x", string);
};
$(document).on("keypress", (e) => {
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
