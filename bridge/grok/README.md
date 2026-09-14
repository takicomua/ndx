# Grok ↔ Cursor bridge

Прямого API між **Grok Bot** і Cursor **немає** — Cursor не читає чуже вікно чату.
Автоматика: **Grok пише в `INBOX.md` → watcher будить Cursor → Cursor виконує.**

## Авто-режим

### 1) Grok пише прямо в файл

Шлях inbox для Grok:

`d:\Cursor\0 to 1\bridge\grok\INBOX.md`

У `PROMPT-FOR-GROK.md` є формат. Якщо Grok **не вміє писати файли** — один раз встав його блок у `INBOX.md`. Далі виконання автоматичне.

### 2) Watcher

```bash
node scripts/watch-grok-inbox.mjs
```

Кожні ~15 с дивиться нові `- [ ]` і друкує `AGENT_LOOP_TICK_grok_inbox`.

### 3) У Cursor

Напиши **«запусти grok auto»** — підніме watcher і виконуватиме inbox.

## Файли

| Файл | Хто пише | Хто читає |
|------|----------|-----------|
| `INBOX.md` | Grok / ти | Cursor |
| `OUTBOX.md` | Cursor | Grok / ти |
| `CONTEXT.md` | обидва | обидва |

## Шаблон

```
# Inbox · Grok → Cursor
Оновлено: YYYY-MM-DD HH:mm

## Задачі
- [ ] **G-001** Title
  - Що зробити:
  - Файли / шляхи:
  - Done when:
  - Пріоритет: P0 | P1 | P2
```
