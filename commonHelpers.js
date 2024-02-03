(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const a=document.querySelector(".search-form"),c=document.querySelector(".gallery");a.addEventListener("submit",n=>{n.preventDefault(),c.innerHTML="";const o=n.currentTarget.elements.searchQuery.value;console.log(o),l(o).then(r=>{c.insertAdjacentHTML("beforeend",u(r.hits)),console.log(r.hits)}).catch(r=>console.log(r))});function l(n){const o="https://pixabay.com/api/",r="42185018-8d9cd3aefdae43a32ddab8929",s=new URLSearchParams({key:r,q:n,image_type:"photo",orientation:"horizontal",safesearch:"true"});return fetch(`${o}?${s}`).then(e=>{if(!e.ok)throw new Error(e.statusText);return console.log(),e.json()})}function u(n){return n.map(({webformatURL:o,tags:r,likes:s,views:e,comments:t,downloads:i})=>`
  <div class="photo-card">
    <img src="${o}" alt="${r}" loading="lazy" />
    <div class="info">
        <p class="info-item">
          <b>Likes</b>
          ${s}
        </p>
        <p class="info-item">
        <b>Views</b>
        ${e}
       </p>
        <p class="info-item">
          <b>Comments</b>
          ${t}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${i}
        </p>
    </div>
  </div>
  `).join("")}
//# sourceMappingURL=commonHelpers.js.map
