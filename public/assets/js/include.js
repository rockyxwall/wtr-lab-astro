async function loadIncludes() {
  const targets = Array.from(document.querySelectorAll('[data-include]'));
  for (const target of targets) {
    const url = target.getAttribute('data-include');
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load include: ${url}`);
    target.outerHTML = await response.text();
  }
  const after = (document.currentScript?.dataset.afterIncludes || '').split(',').filter(Boolean);
  for (const src of after) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }
}
loadIncludes().catch((error) => {
  console.error(error);
  document.body.insertAdjacentHTML('afterbegin', '<p style="padding:1rem;color:#f87171">Unable to load page chunks. Serve this folder over HTTP instead of opening index.html directly.</p>');
});
