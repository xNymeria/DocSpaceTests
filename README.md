# DocSpace Tests

Автоматизированные тесты для DocSpace с использованием TypeScript и Playwright.

## Быстрый старт

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd DocSpaceTests
```

2. Установите зависимости и браузеры:
```bash
npm install
npm run install:browsers
```

3. Скопируйте файл `.env.example` в `.env` и настройте переменные окружения:
```bash
cp .env.example .env
```

4. Запустите тесты:
```bash
npm test
```

## Доступные скрипты

- `npm test` - Запустить все тесты
- `npm run test:headed` - Запустить тесты с UI браузера
- `npm run test:report` - Показать результаты тестов

## Структура проекта

```
src/
├── fixtures/   # Тестовые данные и конфигурация
├── pages/      # Page Object Model классы
└── tests/      # Тестовые файлы (.spec.ts)
package.json          # Зависимости проекта
playwright.config.ts  # Конфигурация Playwright
tsconfig.json         # Конфигурация TypeScript
```
