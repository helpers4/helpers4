/**
 * This file is part of helpers4.
 * Copyright (C) 2025 baxyz
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it } from "bun:test";
import { isSameDay, daysDifference } from "./dateComparison";

describe("date comparison utilities", () => {
  const date1 = new Date("2022-01-20T10:00:00Z");
  const date2 = new Date("2022-01-20T15:00:00Z");
  const date3 = new Date("2022-01-21T10:00:00Z");

  describe("isSameDay", () => {
    it("should check same day", () => {
      expect(isSameDay(date1, date2)).toBe(true);
      expect(isSameDay(date1, date3)).toBe(false);
    });
  });

  describe("daysDifference", () => {
    it("should calculate days difference", () => {
      expect(daysDifference(date1, date3)).toBe(1);
      expect(daysDifference(date1, date2)).toBe(0);
    });
  });
});
