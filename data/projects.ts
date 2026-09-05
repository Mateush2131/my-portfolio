import type { Project } from '../lib/projects';

const screenshot = (id: number, index: number) =>
  `/images/project-${id}.svg#shot-${index}`;

const TELEGRAM_DEMO_NOTE =
  '(Бот развёрнут на сервере. Демо-версия доступна по запросу.)';

const LIVE_SITE_DEMO_NOTE =
  '(На скриншотах — статичный вид. Нажмите «Смотреть сайт», чтобы оценить анимации и интерфейс вживую.)';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Ticket Bot',
    description:
      'Telegram-система для рабочей команды: заявки, финансы, выплаты и управление людьми — без Excel и хаоса в чатах.',
    fullDescription:
      'Заказчику нужна была не переписка в личке, а рабочий инструмент. Ticket Bot превращает Telegram в центр команды: сотрудник подаёт заявку, видит баланс и выводит заработок, а руководитель управляет людьми, деньгами и выплатами из одной панели — прямо с телефона.',
    tech: ['Python', 'Aiogram', 'SQLAlchemy', 'SQLite', 'Redis'],
    image_url: '/images/project-1.svg',
    repo_url: 'https://github.com/Mateush2131/Ticket-bot',
    live_url: null,
    demoNote: TELEGRAM_DEMO_NOTE,
    theme: 'ore',
    screenshots: [
      '/images/projects/ticket-bot/01-admin-profile.png',
      '/images/projects/ticket-bot/02-withdrawal.png',
      '/images/projects/ticket-bot/03-payout-history.png',
      '/images/projects/ticket-bot/04-referral-stats.png',
      '/images/projects/ticket-bot/05-admin-panel.png',
      '/images/projects/ticket-bot/06-bot-statistics.png',
      '/images/projects/ticket-bot/07-broadcast.png',
      '/images/projects/ticket-bot/08-balance-management.png',
      '/images/projects/ticket-bot/09-create-payment.png',
      '/images/projects/ticket-bot/10-payment-notification.png',
      '/images/projects/ticket-bot/11-info-section.png',
    ],
    screenshotsNote:
      'На скриншотах одновременно показан интерфейс администратора и пользователя: слева — действия и панели бота, справа — ответы и команды в чате.',
    problem:
      'Команда росла, а порядок — нет. Заявки терялись в личных сообщениях, балансы считали вручную, выплаты согласовывали отдельно, а кто сколько заработал — знал только один человек с таблицей на компьютере.',
    solution:
      'Сделал единую систему в Telegram: сотрудник регистрируется, видит профиль, баланс и историю выплат, запрашивает вывод одной кнопкой. Руководитель получает админ-панель — модерация заявок, управление людьми, начисления, рассылки и финансовая статистика без лишних программ.',
    results: [
      { label: 'Заявки и финансы', value: 'в одном боте' },
      { label: 'Выплаты сотрудникам', value: 'по кнопке' },
      { label: 'Контроль для руководителя', value: 'с телефона' },
    ],
  },
  {
    id: 2,
    title: 'Mr. Magic Club Bot',
    description:
      'Telegram-бот для боксёрского клуба: учёт учеников, посещений и абонементов — за 30 секунд вместо часа с журналом.',
    fullDescription:
      'Mr. Magic Club Bot создан для тренеров, которым нужен простой и надёжный инструмент без лишней сложности. Несколько тренеров работают в одном боте, отмечают группу за полминуты, видят остаток занятий у каждого ученика и продают абонементы прямо в Telegram. Уже работает в реальном клубе.',
    tech: ['Python', 'Telegram Bot', 'SQLite'],
    image_url: '/images/project-2.svg',
    repo_url: 'https://github.com/Mateush2131/Mrmagicboxingclubbot',
    live_url: null,
    demoNote: TELEGRAM_DEMO_NOTE,
    theme: 'forest',
    screenshots: [
      '/images/projects/mr-magic/01-groups.png',
      '/images/projects/mr-magic/02-add-student.png',
      '/images/projects/mr-magic/03-attendance.png',
      '/images/projects/mr-magic/04-student-profile.png',
      '/images/projects/mr-magic/05-student-added.png',
      '/images/projects/mr-magic/06-restore-classes.png',
    ],
    problem:
      'Тренеры тратили часы на бумажные журналы и таблицы. Ошибки в списаниях, споры с клиентами, потерянные данные — клуб терял и время, и деньги, а ученики не понимали, сколько занятий осталось.',
    solution:
      'Сделал бота, который любой тренер освоит за 5 минут: добавил ученика, отметил группу, продал абонемент — всё через кнопки. Цветовая подсказка показывает, у кого заканчиваются занятия, а восстановление по болезни занимает пару нажатий.',
    results: [
      { label: 'Отметка группы', value: 'за 30 секунд' },
      { label: 'Видов абонементов', value: '6' },
      { label: 'Тренеров в одном боте', value: 'несколько' },
    ],
  },
  {
    id: 3,
    title: 'AppealBot',
    description:
      'Система приёма обращений для школы: ученик пишет — администратор видит, обрабатывает и контролирует всё в одном месте.',
    fullDescription:
      'AppealBot — готовое решение для образовательных организаций, где ученики постоянно задают вопросы, жалуются и предлагают идеи. Вместо хаоса в личных сообщениях — понятный бот: ученик оставляет обращение за пару минут, следит за статусом, а администрация видит всё в одной панели со статистикой.',
    tech: ['Python', 'Telegram Bot', 'FastAPI', 'PostgreSQL'],
    image_url: '/images/project-3.svg',
    repo_url: 'https://github.com/Mateush2131/Appealbot',
    live_url: null,
    demoNote: TELEGRAM_DEMO_NOTE,
    theme: 'obsidian',
    screenshots: [
      '/images/projects/appealbot/01-create-appeal.png',
      '/images/projects/appealbot/02-priority.png',
      '/images/projects/appealbot/03-appeal-created.png',
      '/images/projects/appealbot/04-my-appeals.png',
      '/images/projects/appealbot/05-help.png',
      '/images/projects/appealbot/06-admin-panel.png',
    ],
    screenshotsNote:
      'На скриншотах показаны интерфейсы ученика и администратора: создание обращения, отслеживание статуса и панель управления заявками.',
    problem:
      'Ученики писали администраторам в личку — обращения терялись, статусы забывались, статистики не было. Каждый вопрос превращался в долгую переписку, а руководство не видело общей картины.',
    solution:
      'Собрал бота с простым сценарием для ученика: указал данные, выбрал тип обращения и приоритет — готово. Администратор получает все заявки в одном списке, меняет статусы, смотрит статистику и выгружает отчёты. Ученик всегда знает, на каком этапе его вопрос.',
    results: [
      { label: 'Потерянных обращений', value: '0' },
      { label: 'Создать обращение', value: 'за 2 минуты' },
      { label: 'Статистика для руководства', value: 'в один клик' },
    ],
  },
  {
    id: 4,
    title: 'StudyBuddyBot',
    description:
      'Личный учебный помощник в Telegram: расписание, дедлайны и заметки — всегда под рукой, без лишних приложений.',
    fullDescription:
      'StudyBuddy — бот для тех, кто устал терять расписание и забывать про дедлайны. Всё учебное в одном Telegram: пары, сроки сдачи, заметки и быстрый поиск. Утром бот напоминает, что сегодня по плану — не нужно открывать пять разных приложений.',
    tech: ['Python', 'Telegram Bot', 'APScheduler'],
    image_url: '/images/project-4.svg',
    repo_url: 'https://github.com/Mateush2131/Studybudybotdeploy',
    live_url: null,
    demoNote: TELEGRAM_DEMO_NOTE,
    theme: 'ground',
    screenshots: [
      '/images/projects/studybuddy/01-main-menu.png',
      '/images/projects/studybuddy/02-add-schedule.png',
      '/images/projects/studybuddy/03-notes.png',
      '/images/projects/studybuddy/04-today.png',
      '/images/projects/studybuddy/05-add-deadline.png',
      '/images/projects/studybuddy/06-search.png',
      '/images/projects/studybuddy/07-help.png',
      '/images/projects/studybuddy/08-schedule-list.png',
      '/images/projects/studybuddy/09-deadlines-list.png',
    ],
    problem:
      'Расписание — в одном месте, дедлайны — в другом, заметки — в третьем. Ученики забывали про пары и срывали сроки, потому что не было одного простого инструмента, который всегда под рукой.',
    solution:
      'Сделал бота с понятным меню: добавил пару, записал дедлайн, сохранил заметку — всё за минуту. Раздел «Сегодня» показывает план на день, поиск находит нужное мгновенно, а утреннее напоминание не даёт забыть про занятия.',
    results: [
      { label: 'Вместо приложений', value: 'один Telegram-бот' },
      { label: 'Утреннее напоминание', value: 'каждый день в 8:00' },
      { label: 'Добавить пару или задачу', value: 'за 1 минуту' },
    ],
  },
  {
    id: 5,
    title: 'SysMasterUltra',
    description:
      'Одна программа для Windows вместо десяти: мониторинг, процессы, сеть и безопасность — всё в красивом окне.',
    fullDescription:
      'SysMasterUltra — системный комбайн для Windows, который собрал всё нужное в одном месте. Не нужно прыгать между диспетчером задач, мониторингом и консольными утилитами: процессы, графики загрузки, проверка сети, шифрование и диагностика системы — в одном приложении с понятным интерфейсом.',
    tech: ['C#', 'WinForms', '.NET 4.8'],
    image_url: '/images/projects/sysmaster-ultra/01-processes.png',
    repo_url: 'https://github.com/Mateush2131/SysMasterUltra',
    live_url: 'https://github.com/Mateush2131/SysMasterUltra/releases',
    theme: 'lava',
    screenshots: [
      '/images/projects/sysmaster-ultra/01-processes.png',
      '/images/projects/sysmaster-ultra/02-monitoring.png',
      '/images/projects/sysmaster-ultra/03-keyboard-hook.png',
      '/images/projects/sysmaster-ultra/04-reflection.png',
      '/images/projects/sysmaster-ultra/05-network.png',
      '/images/projects/sysmaster-ultra/06-security.png',
      '/images/projects/sysmaster-ultra/07-utilities.png',
    ],
    problem:
      'Чтобы понять, что происходит с компьютером, приходилось открывать кучу программ по очереди. Для учёбы нужно было сдавать несколько лабораторных — каждая в отдельном приложении, без единого интерфейса.',
    solution:
      'Собрал одно окно, где есть всё: список процессов, графики загрузки, проверка сети, шифрование текста, генератор паролей и системные утилиты. Красивый интерфейс вместо консоли — удобно и для работы, и для демонстрации проекта.',
    results: [
      { label: 'Инструментов в одном окне', value: '10+' },
      { label: 'Диагностика системы', value: 'без лишних программ' },
      { label: 'Готовое приложение', value: 'скачать и запустить' },
    ],
  },
  {
    id: 6,
    title: 'Takamaka',
    description:
      'Сайт яхтенного клуба с сильным визуалом: клиент смотрит яхты и оставляет заявку за пару кликов.',
    fullDescription:
      'Takamaka — лендинг для капитана яхты, которому нужен был не просто «сайт-визитка», а инструмент продаж. Красивый дизайн с анимациями, понятная структура и форма заявки. Клиент находит всё сам, капитан получает заявку в Telegram.',
    tech: ['Next.js', 'TailwindCSS', 'Framer Motion'],
    image_url: '/images/projects/takamaka/01-hero.png',
    repo_url: 'https://github.com/Mateush2131',
    live_url: 'http://91.135.157.42:3001',
    live_label: 'Смотреть сайт',
    demoNote: LIVE_SITE_DEMO_NOTE,
    theme: 'lava',
    screenshots: [
      '/images/projects/takamaka/01-hero.png',
      '/images/projects/takamaka/02-about-yachts.png',
      '/images/projects/takamaka/03-specs-catamaran.png',
      '/images/projects/takamaka/04-contacts.png',
      '/images/projects/takamaka/05-reviews.png',
    ],
    problem:
      'У капитана не было сайта — клиенты находили его только через знакомых. Неудобно, непрофессионально, заявки терялись в переписке.',
    solution:
      'Сделал лендинг, который продаёт сам: яркий визуал, понятное меню, описание яхт и форма заявки. Клиент видит суда и цены, оставляет заявку — капитан получает её в Telegram.',
    results: [
      { label: 'Заявка с сайта', value: 'за 2 клика' },
      { label: 'Уведомление капитану', value: 'в Telegram' },
      { label: 'Первое впечатление', value: 'премиальный' },
    ],
  },
];
