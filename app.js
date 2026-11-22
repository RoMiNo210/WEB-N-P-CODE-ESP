let items = [];
const $ = s => document.querySelector(s);

fetch('catalog.json')
  .then(r => r.json())
  .then(data => {
    items = data;
    const chips = [...new Set(data.flatMap(x => x.chips))].sort();
    const cats = [...new Set(data.map(x => x.category))].sort();
    chips.forEach(x => $('#chip').add(new Option(x, x)));
    cats.forEach(x => $('#category').add(new Option(x, x)));
    render();
  })
  .catch(() => {
    $('#catalog').textContent = 'Không tải được catalog.json. Hãy chạy website qua máy chủ HTTP.';
  });

function sortItems(list, mode) {
  const by = {
    name: (a, b) => a.name.localeCompare(b.name),
    category: (a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name),
    official: (a, b) => (b.official === true) - (a.official === true) || a.name.localeCompare(b.name)
  }[mode] || ((a, b) => a.name.localeCompare(b.name));
  return [...list].sort(by);
}

function render() {
  const q = $('#search').value.toLowerCase();
  const c = $('#chip').value;
  const k = $('#category').value;
  const sort = $('#sort') ? $('#sort').value : 'name';

  let found = items.filter(x =>
    (!c || x.chips.includes(c)) &&
    (!k || x.category === k) &&
    (x.name + ' ' + x.desc + ' ' + x.chips.join(' ') + ' ' + x.category)
      .toLowerCase()
      .includes(q)
  );
  found = sortItems(found, sort);

  $('#count').textContent = found.length + ' / ' + items.length + ' DỰ ÁN';
  $('#catalog').innerHTML = found.map(x => `
    <article class="item">
      <div class="item-top">
        <h3>${esc(x.name)}</h3>
        ${x.official ? '<span class="badge official">CHÍNH THỨC</span>' : ''}
      </div>
      <p>${esc(x.desc)}</p>
      <div class="meta">
        ${x.chips.map(t => `<span class="tag">${esc(t)}</span>`).join('')}
        <span class="tag cat">${esc(x.category)}</span>
        ${x.license ? `<span class="tag lic">${esc(x.license)}</span>` : ''}
      </div>
      <div class="item-actions">
        <a href="${esc(x.url)}" target="_blank" rel="noopener">MỞ MÃ NGUỒN ↗</a>
        <button class="clone" data-url="${esc(x.url)}" type="button">SAO CHÉP LỆNH CLONE</button>
      </div>
    </article>
  `).join('') || '<p class="hint">Không tìm thấy kết quả phù hợp.</p>';

  document.querySelectorAll('.clone').forEach(btn => {
    btn.onclick = async () => {
      const cmd = `git clone ${btn.dataset.url}.git`;
      try {
        await navigator.clipboard.writeText(cmd);
        const old = btn.textContent;
        btn.textContent = 'ĐÃ SAO CHÉP ✓';
        setTimeout(() => { btn.textContent = old; }, 1600);
      } catch (e) {
        btn.textContent = 'KHÔNG THỂ SAO CHÉP';
      }
    };
  });
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

let searchDebounce;
$('#search').addEventListener('input', () => {
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(render, 120);
});
['chip', 'category', 'sort'].forEach(id => {
  const el = $('#' + id);
  if (el) el.addEventListener('change', render);
});

document.querySelectorAll('.tab').forEach(b => b.onclick = () => {
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t === b));
  $('#codePane').hidden = b.dataset.tab !== 'code';
  $('#firmwarePane').hidden = b.dataset.tab !== 'firmware';
});

$('#copy').onclick = async () => {
  try {
    await navigator.clipboard.writeText($('#code').value);
    $('#copy').textContent = 'ĐÃ SAO CHÉP';
  } catch (e) {
    $('#copy').textContent = 'KHÔNG THỂ SAO CHÉP';
  }
};

$('#bin').onchange = e => {
  const f = e.target.files[0];
  $('#fileInfo').textContent = f
    ? `Đã chọn: ${f.name} · ${(f.size / 1024).toFixed(1)} KB · Chỉ kiểm tra cục bộ, chưa nạp.`
    : 'Chưa chọn file.';
};

$('#usb').onclick = () => {
  $('#usbInfo').textContent = ('serial' in navigator)
    ? 'Trình duyệt có Web Serial API. Quyền truy cập và adapter USB-Serial còn phụ thuộc hệ điều hành/thiết bị. Chức năng nạp chưa được bật trong bản thư viện này.'
    : 'Không thấy Web Serial API trong trình duyệt hiện tại. Hãy thử Chrome/Edge trên máy tính; Android 11 có thể bị giới hạn.';
};
