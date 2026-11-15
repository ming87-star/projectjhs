/*
 * projectJHS 게임 목록 — 첫 화면의 내용은 모두 여기서 나옵니다.
 *
 * 고칠 때 알아 둘 것
 *  - 글은 { ko: '한국어', en: 'English' } 짝으로 씁니다. en 을 비우면 영어 화면에도 한국어가 나옵니다.
 *  - stage: 'playable' 은 큰 칸(지금 해 볼 수 있는 게임), 'making' 은 아래쪽 작은 칸(만들고 있는 게임)입니다.
 *  - 영상이 생기면 video 에 파일을 넣으세요. assets/<id>/video-ko.mp4 처럼 두고 길이(length)를 적으면
 *    '바로 가기 → 플레이 영상'과 그 게임 칸의 '영상 보기' 단추가 저절로 생깁니다.
 *  - motion 은 제목 글자가 움직이는 방식입니다: descend(내려감) climb(오름) signal(신호) magic(마법)
 *    crawl(기어 옴) type(타자) snap(격자) brush(붓).
 */
window.PROJECTJHS_GAMES = [
  {
    id: 'this-way-down',
    stage: 'playable',
    motion: 'descend',
    accent: '#ff9a3c',
    title: { ko: '내려가는 방향은 이쪽입니다', en: 'This Way Down' },
    short: { ko: '내려가는 방향은 이쪽입니다', en: 'This Way Down' },
    phrase: { ko: '횃불 하나 들고 던전을 내려가는', en: 'carry one torch down into the dark' },
    kicker: { ko: '3D 로그라이트 던전 크롤러', en: '3D roguelite dungeon crawler' },
    pitch: {
      ko: '횃불 하나 들고 내려가는 3D 로그라이트 던전. 층마다 새 길, 다섯 층마다 층의 주인.',
      en: 'A one-handed 3D roguelite dungeon dive. Carry a torch, pick cards, beat bosses.',
    },
    detail: {
      ko: '체험판은 지하 미궁 15층, 거미 여왕까지입니다. 정식판에는 스테이지 일곱 곳과 심연, 무한 투기장, 직업 열두 가지가 있습니다.',
      en: 'The demo goes down to floor 15 of the Depths, where the Spider Queen waits. The full game has seven stages, the Abyss, the Endless Arena and twelve classes.',
    },
    perk: {
      ko: '베타 테스터 선물: ‘개척자의 망토’와 칭호 「첫 길을 연 자」. 정식 출시 뒤에도 남습니다.',
      en: 'Beta tester gift: the Pioneer’s Cape and the title “The First to Find the Way”, kept after launch.',
    },
    langs: { ko: '한국어 · English', en: 'Korean · English' },
    status: { ko: ['웹 체험판', '안드로이드 비공개 베타 모집 중'], en: ['Web demo', 'Android closed beta open'] },
    icon: 'assets/this-way-down/icon.webp',
    art: { ko: 'assets/this-way-down/art-ko.webp', en: 'assets/this-way-down/art-en.webp' },
    screen: {
      shape: 'tall',
      loop: { ko: 'assets/this-way-down/loop-ko.mp4', en: 'assets/this-way-down/loop-en.mp4' },
      poster: { ko: 'assets/this-way-down/poster-ko.webp', en: 'assets/this-way-down/poster-en.webp' },
      shots: {
        ko: ['assets/this-way-down/shot-ko-1.webp', 'assets/this-way-down/shot-ko-2.webp'],
        en: ['assets/this-way-down/shot-en-1.webp', 'assets/this-way-down/shot-en-2.webp'],
      },
    },
    video: {
      shape: 'tall',
      length: '1:00',
      src: { ko: 'assets/this-way-down/video-ko.mp4', en: 'assets/this-way-down/video-en.mp4' },
      poster: { ko: 'assets/this-way-down/poster-ko.webp', en: 'assets/this-way-down/poster-en.webp' },
    },
    play: {
      href: 'https://aldstark.itch.io/this-way-down',
      note: { ko: 'itch.io · 15층까지', en: 'itch.io · to floor 15' },
    },
    beta: {
      href: { ko: 'https://forms.gle/o2vbKJ6C4Nw3FSK39', en: 'https://forms.gle/GSRo1tWzANDNzH1n8' },
      note: { ko: '구글 설문', en: 'Google Form' },
    },
    links: [],
  },
  {
    id: 'how-to-wizard',
    stage: 'playable',
    motion: 'magic',
    accent: '#f2cd6b',
    title: { ko: '마법사가 되던 방법', en: 'How You Once Became a Wizard' },
    short: { ko: '마법사가 되던 방법', en: 'How You Once Became a Wizard' },
    phrase: { ko: '숲속 오두막에서 마법을 찾아내는', en: 'discover spells in a forest cottage' },
    kicker: { ko: '마법 연구 · 오두막 생활 · 밤 방어', en: 'Spellcrafting · cottage life · night defense' },
    pitch: {
      ko: '숲속 오두막에서 재료를 모으고 마법을 연구해, 밤마다 몰려오는 밤짐승을 막아 내는 견습 마법사의 한 해.',
      en: 'Gather herbs, discover spells, and guard a forest cottage from night beasts.',
    },
    detail: {
      ko: '갈고, 끓이고, 말려서 마법을 찾고 밤이면 그 마법으로 집을 지킵니다. 웹에서는 봄이 끝날 때까지 무료로 해 볼 수 있고, 사계절 이야기는 앱에서 이어집니다.',
      en: 'Grind, boil and dry ingredients to find spells, then hold the cottage with them at night. Play free on the web until spring ends; the four-season story continues in the app.',
    },
    perk: null,
    langs: { ko: '한국어 · English', en: 'Korean · English' },
    status: { ko: ['웹 체험판', '안드로이드 비공개 테스트 모집 중'], en: ['Web demo', 'Android closed test open'] },
    icon: 'assets/how-to-wizard/icon.webp',
    art: { ko: 'assets/how-to-wizard/art-ko.webp', en: 'assets/how-to-wizard/art-en.webp' },
    screen: {
      shape: 'wide',
      loop: { ko: 'assets/how-to-wizard/loop-ko.mp4', en: 'assets/how-to-wizard/loop-en.mp4' },
      poster: { ko: 'assets/how-to-wizard/poster-ko.webp', en: 'assets/how-to-wizard/poster-en.webp' },
      shots: {
        ko: ['assets/how-to-wizard/shot-ko-1.webp', 'assets/how-to-wizard/shot-ko-2.webp', 'assets/how-to-wizard/shot-ko-3.webp'],
        en: ['assets/how-to-wizard/shot-en-1.webp', 'assets/how-to-wizard/shot-en-2.webp', 'assets/how-to-wizard/shot-en-3.webp'],
      },
    },
    video: {
      shape: 'wide',
      length: '0:41',
      src: { ko: 'assets/how-to-wizard/video-ko.mp4', en: 'assets/how-to-wizard/video-en.mp4' },
      poster: { ko: 'assets/how-to-wizard/poster-ko.webp', en: 'assets/how-to-wizard/poster-en.webp' },
    },
    play: {
      href: 'https://how-to-wizard.web.app/',
      note: { ko: '봄이 끝날 때까지', en: 'until spring ends' },
    },
    beta: {
      href: 'https://how-to-wizard.web.app/beta',
      note: { ko: '테스터 안내 페이지', en: 'tester page' },
    },
    links: [
      { label: { ko: 'itch.io', en: 'itch.io' }, href: 'https://aldstark.itch.io/how-to-wizard' },
      { label: { ko: '개인정보처리방침', en: 'Privacy policy' }, href: 'privacy/how-to-wizard.html' },
    ],
  },
  {
    id: 'otherworld-sos',
    stage: 'playable',
    motion: 'signal',
    accent: '#5fdcff',
    title: { ko: '이세계에서의 구조신호', en: 'Rescue Signal from Another World' },
    short: { ko: '이세계에서의 구조신호', en: 'Rescue Signal from Another World' },
    phrase: { ko: '꿈으로 우리 동네에 구조신호를 보내는', en: 'send a distress call through dreams' },
    kicker: { ko: '도트 방치형 RPG · 실제 지도', en: 'Pixel idle RPG · real-world map' },
    pitch: {
      ko: '우리 동네 사람들이 꿈의 신호를 받고 이세계 던전으로! 지켜보며 키우는 도트 방치형 RPG.',
      en: 'Your real neighbors answer a dream’s call to a dungeon world. A pixel idle RPG.',
    },
    detail: {
      ko: '실제 지도에서 신호를 보낼 곳을 고르면, 응답한 사람들이 동료가 되어 층마다 알아서 싸웁니다. 쓰러진 동료는 기억을 잃고 현실로 돌아갑니다.',
      en: 'Pick a spot on the real map to send the signal. Whoever answers joins your party and fights floor by floor on their own. Anyone who falls forgets everything and wakes up back home.',
    },
    perk: null,
    langs: null,
    status: { ko: ['웹판', '안드로이드 베타 테스터 모집 중'], en: ['Web version', 'Android beta open'] },
    icon: 'assets/otherworld-sos/icon.webp',
    art: { ko: 'assets/otherworld-sos/art-ko.webp', en: 'assets/otherworld-sos/art-en.webp' },
    screen: {
      shape: 'tall',
      loop: null,
      poster: null,
      shots: {
        ko: ['assets/otherworld-sos/shot-ko-1.webp', 'assets/otherworld-sos/shot-ko-2.webp', 'assets/otherworld-sos/shot-ko-3.webp'],
        en: ['assets/otherworld-sos/shot-en-1.webp', 'assets/otherworld-sos/shot-en-2.webp', 'assets/otherworld-sos/shot-en-3.webp'],
      },
    },
    video: null,
    play: {
      href: 'https://otherworld-sos.web.app/',
      note: { ko: '웹판', en: 'web version' },
    },
    beta: {
      href: 'https://otherworld-sos.web.app/beta.html',
      note: { ko: '테스터 신청 페이지', en: 'sign-up page' },
    },
    links: [
      { label: { ko: 'itch.io', en: 'itch.io' }, href: 'https://aldstark.itch.io/otherworld-sos' },
      { label: { ko: '개인정보처리방침', en: 'Privacy policy' }, href: 'https://otherworld-sos.web.app/privacy.html' },
    ],
  },
  {
    id: 'whileclimbing',
    stage: 'playable',
    motion: 'climb',
    accent: '#ff5a4e',
    title: { ko: '오늘도 탑을 오르는 나는 무슨 생각을 해야 할까', en: '오늘도 탑을 오르는 나는 무슨 생각을 해야 할까' },
    gloss: { en: '“What should I think about, climbing the tower again today?”' },
    short: { ko: '오늘도 탑을 오르는 나는', en: '오늘도 탑을 오르는 나는' },
    phrase: { ko: '오늘도 탑을 한 칸씩 오르는', en: 'climb the tower one step at a time, again' },
    kicker: { ko: '한 손 로그라이트', en: 'One-thumb roguelite' },
    pitch: {
      ko: '한 손으로 오르는 탑. 왼쪽·위·오른쪽 중 한 칸을 고를 뿐입니다.',
      en: 'A tower you climb with one thumb. Each step, you only choose left, up or right.',
    },
    detail: {
      ko: '직업 여덟, 유물 서른다섯, 무기 서른여섯 자루. 죽으면 처음부터지만 메달과 도감은 남습니다. 웹 체험판은 200층까지입니다.',
      en: 'Eight classes, 35 relics, 36 weapons. Die and you start over, but medals and the codex stay. The web demo goes to floor 200. Korean only for now.',
    },
    perk: {
      ko: '베타 테스터 선물: 앱에서 다음 직업 하나를 미리 열어 드립니다.',
      en: 'Beta tester gift: the next class unlocked early in the app.',
    },
    langs: { ko: '한국어', en: 'Korean only' },
    status: { ko: ['웹 체험판', '안드로이드 베타 테스터 모집 중'], en: ['Web demo', 'Android beta open'] },
    icon: 'assets/whileclimbing/icon.webp',
    art: { ko: 'assets/whileclimbing/art-ko.webp' },
    screen: {
      shape: 'tall',
      loop: { ko: 'assets/whileclimbing/loop-ko.mp4' },
      poster: { ko: 'assets/whileclimbing/shot-ko-3.webp' },
      shots: { ko: ['assets/whileclimbing/shot-ko-1.webp', 'assets/whileclimbing/shot-ko-2.webp'] },
    },
    video: {
      shape: 'tall',
      length: '0:09',
      clip: true,
      src: { ko: 'assets/whileclimbing/loop-ko.mp4' },
      poster: { ko: 'assets/whileclimbing/shot-ko-3.webp' },
    },
    play: {
      href: 'whileclimbing/',
      note: { ko: '200층까지', en: 'to floor 200 · Korean' },
    },
    beta: {
      href: 'https://forms.gle/QesmukNxzQuQWf7YA',
      note: { ko: '구글 설문', en: 'Google Form · Korean' },
    },
    links: [
      { label: { ko: '개인정보처리방침', en: 'Privacy policy' }, href: 'privacy/whileclimbing.html' },
    ],
  },
  {
    id: 'bugs-master',
    stage: 'playable',
    motion: 'crawl',
    accent: '#a8dc5a',
    title: { ko: '벅스마스터', en: 'Bugs Master' },
    short: { ko: '벅스마스터', en: 'Bugs Master' },
    phrase: { ko: '진짜 곤충을 채집하고 길러 겨루는', en: 'catch, raise and spar with real insects' },
    kicker: { ko: '곤충 채집 · 육성 · 체급 대결', en: 'Insect collecting · raising · sparring' },
    pitch: {
      ko: '작은 곤충과 시작하는 모험! 채집하고 돌보며 체급별 대결에 도전하세요.',
      en: 'Collect insects, care for them, and spar with opponents of the same size.',
    },
    detail: {
      ko: '실사풍 곤충을 채집하고, 움직임을 관찰하고, 개체마다 다른 능력을 길러 소형·중형·대형 대표로 겨룹니다.',
      en: 'Catch lifelike insects, watch how they move, and raise each one’s strengths to field small, medium and large champions.',
    },
    perk: {
      ko: '베타 참여 선물: 베타 개척자 배지와 맞춤 영양 보급 1개. 만 14세 이상, 구글 그룹 가입 승인 뒤 Play 테스트에 참여합니다.',
      en: 'Beta gift: a Beta Pioneer badge and one custom nutrition supply. Ages 14+. Join the Google Group, get approved, then opt in on Google Play.',
    },
    langs: { ko: '한국어 · English', en: 'Korean · English' },
    status: { ko: ['웹에서 체험', '안드로이드 베타 테스터 모집 중'], en: ['Play on the web', 'Android beta open'] },
    icon: 'assets/bugs-master/icon.webp',
    art: { ko: 'assets/bugs-master/art-ko.webp' },
    screen: {
      shape: 'tall',
      loop: null,
      poster: null,
      shots: {
        ko: ['assets/bugs-master/shot-ko-1.webp', 'assets/bugs-master/shot-ko-2.webp'],
        en: ['assets/bugs-master/shot-en-1.webp', 'assets/bugs-master/shot-en-2.webp'],
      },
    },
    video: null,
    play: {
      href: 'https://bugs-master.ald-stark.chatgpt.site/',
      note: { ko: '공식 사이트', en: 'official site' },
    },
    beta: {
      href: 'https://groups.google.com/g/bugsmaster',
      note: { ko: '구글 그룹 · 만 14세 이상', en: 'Google Group · ages 14+' },
    },
    links: [
      { label: { ko: 'itch.io', en: 'itch.io' }, href: 'https://aldstark.itch.io/bugs-master' },
      { label: { ko: '개인정보처리방침', en: 'Privacy policy' }, href: 'privacy/bugs-master.html' },
      { label: { ko: '계정·데이터 삭제', en: 'Delete account & data' }, href: 'privacy/bugs-master-deletion.html' },
    ],
  },
  {
    id: 'office-raid',
    stage: 'making',
    motion: 'type',
    accent: '#6fb0ff',
    title: { ko: 'OFFICE RAID', en: 'OFFICE RAID' },
    short: { ko: 'OFFICE RAID', en: 'OFFICE RAID' },
    phrase: { ko: '동료를 모아 거대한 프로젝트를 공략하는', en: 'hire a team and raid giant projects' },
    pitch: {
      ko: '동료를 모아 회사를 키우고 거대한 프로젝트를 공략하는 인재 수집형 오피스 RPG.',
      en: 'A talent-collecting office RPG: hire a team, grow the company and raid giant projects.',
    },
    status: { ko: ['개발 중', '웹 프로토타입'], en: ['In development', 'Web prototype'] },
    art: { ko: 'assets/office-raid/art.webp' },
    play: null,
  },
  {
    id: 'gridbound',
    stage: 'making',
    motion: 'snap',
    accent: '#b495ff',
    title: { ko: '그리드바운드', en: 'Gridbound' },
    short: { ko: '그리드바운드', en: 'Gridbound' },
    phrase: { ko: '도형 모양 동료를 맞물려 성문을 지키는', en: 'lock shaped allies together to hold the gate' },
    pitch: {
      ko: '폴리오미노 모양의 동료를 맞물려 성문을 지키는 중세 판타지 전술 RPG. 변을 맞댄 유닛끼리 연계가 생깁니다.',
      en: 'A medieval fantasy tactics RPG: interlock polyomino-shaped allies to hold the castle gate. Units that share an edge link their skills.',
    },
    status: { ko: ['프로토타입', '세로형 모바일'], en: ['Prototype', 'Portrait mobile'] },
    art: { ko: 'assets/gridbound/art.webp' },
    play: {
      href: 'https://gridbound-game.ald-stark.chatgpt.site/',
      label: { ko: '프로토타입 해 보기', en: 'Try the prototype' },
    },
  },
  {
    id: 'road-to-hanyang',
    stage: 'making',
    motion: 'brush',
    accent: '#ead9b8',
    title: { ko: '한양 가는 길', en: 'The Road to Hanyang' },
    short: { ko: '한양 가는 길', en: 'The Road to Hanyang' },
    phrase: { ko: '선비와 무사와 보부상이 한양으로 걸어가는', en: 'walk the road to Hanyang with a scholar, a warrior and a merchant' },
    pitch: {
      ko: '선비·무사·보부상이 각자의 이유로 한양에 가는, 조선 배경 카드 덱빌딩 로그라이크.',
      en: 'A Joseon-era deckbuilding roguelike: a scholar, a warrior and a merchant each walk to Hanyang for their own reasons.',
    },
    status: { ko: ['프로토타입', '안드로이드 우선'], en: ['Prototype', 'Android first'] },
    art: { ko: 'assets/road-to-hanyang/art.webp' },
    play: null,
  },
];
