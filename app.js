const menuToggle = document.querySelector('.menu-toggle');
const gnb = document.querySelector('.gnb');

menuToggle?.addEventListener('click', () => {
  const open = gnb.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.gnb a').forEach(link => {
  link.addEventListener('click', () => {
    gnb.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const filterButtons = document.querySelectorAll('.filter-btn');
const notes = document.querySelectorAll('.note-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    notes.forEach(note => {
      note.classList.toggle(
        'hidden',
        filter !== 'all' && note.dataset.category !== filter
      );
    });
  });
});

const modal = document.getElementById('modal');
const modalLabel = document.getElementById('modalLabel');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');

const caseData = {
  foreign: {
    label: 'QUALITY CASE 01',
    title: '이물 발견 대응 관점',
    html: `
      <p>실제 업무에서는 회사 기준과 사실관계를 우선 확인해야 합니다. 포트폴리오에서는 다음과 같은 사고 흐름을 보여줄 수 있습니다.</p>
      <ul>
        <li>제품, LOT, 구매 및 보관 정보 확인</li>
        <li>이물의 형태와 발생 위치 확인</li>
        <li>원재료, 제조공정, 설비, 작업환경 가능성 검토</li>
        <li>관련 기록과 동일 LOT 상태 확인</li>
        <li>원인 규명 후 조치 및 재발방지 방안 정리</li>
      </ul>`
  },
  color: {
    label: 'QUALITY CASE 02',
    title: '제품 변색 대응 관점',
    html: `
      <p>변색 현상은 한 가지 원인으로 단정하지 않고 제품 특성, 보관, 공정, 포장 상태를 함께 확인하는 방식으로 접근합니다.</p>
      <ul>
        <li>정상 제품과 외관 비교</li>
        <li>보관온도 및 보관기간 확인</li>
        <li>포장 손상 및 외기 노출 가능성 검토</li>
        <li>공정조건과 설비 이상 여부 확인</li>
        <li>재현 가능성 및 예방조치 검토</li>
      </ul>`
  },
  temp: {
    label: 'QUALITY CASE 03',
    title: '냉장 온도 이상 대응 관점',
    html: `
      <p>냉장 제품은 입고부터 보관, 진열까지 온도 유지가 중요하므로 단계별 확인이 필요합니다.</p>
      <ul>
        <li>입고 시 제품 상태 및 온도 기록 확인</li>
        <li>냉장 설비 상태와 표시온도 확인</li>
        <li>문 개방, 적재, 동선 등 운영 요인 검토</li>
        <li>영향 범위와 대상 제품 파악</li>
        <li>시정조치 후 재발방지 확인</li>
      </ul>`
  }
};

function openModal(label, title, html){
  modalLabel.textContent = label;
  modalTitle.textContent = title;
  modalContent.innerHTML = html;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.case-card').forEach(card => {
  card.addEventListener('click', () => {
    const item = caseData[card.dataset.case];
    openModal(item.label, item.title, item.html);
  });
});

document.querySelectorAll('.note-open').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.note-card');
    const category = card.querySelector('span').textContent;
    const title = card.querySelector('h3').textContent;
    openModal(
      category,
      title,
      `<p>현재는 저충실도 콘텐츠 초안입니다. 실제 사이트 운영 전 최신 식품공전·식품위생법·HACCP 공식 기준을 확인한 뒤, ‘핵심 기준 → 왜 중요한가 → 품질관리 실무 적용’ 구조로 내용을 채우는 것을 권장합니다.</p>`
    );
  });
});

document.querySelectorAll('.project-open').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.project-card');
    const tag = card.querySelector('.project-body > span').textContent;
    const title = card.querySelector('h3').textContent;
    const desc = card.querySelector('p').textContent;
    openModal(
      tag,
      title,
      `<p>${desc}</p>
       <ul>
         <li>프로젝트 목적</li>
         <li>수행한 내용</li>
         <li>배운 점</li>
         <li>품질관리 업무와의 연결</li>
       </ul>
       <p>실제 결과물 이미지나 PDF가 준비되면 이 영역에 연결할 수 있습니다.</p>`
    );
  });
});

document.querySelectorAll('[data-close-modal]').forEach(el => {
  el.addEventListener('click', closeModal);
});

document.addEventListener('keydown', e => {
  if(e.key === 'Escape' && modal.classList.contains('show')) closeModal();
});

document.getElementById('resumeBtn')?.addEventListener('click', () => {
  openModal(
    'RESUME',
    '이력서 연결 영역',
    '<p>현재 초안에서는 실제 이력서 파일이 연결되어 있지 않습니다. 배포 시 PDF 파일 경로를 버튼에 연결하면 바로 다운로드 또는 새 탭 보기 방식으로 사용할 수 있습니다.</p>'
  );
});
