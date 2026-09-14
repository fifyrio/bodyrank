import { test } from "node:test";
import assert from "node:assert/strict";
import { languageAlternates, localizePath, splitLocale } from "./locale.ts";

test("localizePath keeps English at the root and prefixes Spanish", () => {
  assert.equal(localizePath("/", "en"), "/");
  assert.equal(localizePath("/how-strong-am-i", "en"), "/how-strong-am-i");
  assert.equal(localizePath("/", "es"), "/es");
  assert.equal(localizePath("/how-strong-am-i", "es"), "/es/how-strong-am-i");
});

test("splitLocale recovers the language and neutral path", () => {
  assert.deepEqual(splitLocale("/"), { lang: "en", path: "/" });
  assert.deepEqual(splitLocale("/how-strong-am-i"), { lang: "en", path: "/how-strong-am-i" });
  assert.deepEqual(splitLocale("/es"), { lang: "es", path: "/" });
  assert.deepEqual(splitLocale("/es/how-strong-am-i"), { lang: "es", path: "/how-strong-am-i" });
  // A path that merely starts with "es" is not Spanish.
  assert.deepEqual(splitLocale("/estimate"), { lang: "en", path: "/estimate" });
});

test("splitLocale and localizePath round-trip", () => {
  for (const pathname of ["/", "/how-strong-am-i", "/es", "/es/how-strong-am-i"]) {
    const { lang, path } = splitLocale(pathname);
    assert.equal(localizePath(path, lang), pathname);
  }
});

test("languageAlternates lists every language plus x-default", () => {
  assert.deepEqual(languageAlternates("/how-strong-am-i"), {
    en: "/how-strong-am-i",
    es: "/es/how-strong-am-i",
    "x-default": "/how-strong-am-i",
  });
});
