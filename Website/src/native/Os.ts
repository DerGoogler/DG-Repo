import ons from "onsenui";
import React, { useCallback } from "react";
import { useEventListener } from "usehooks-ts";
import { Native } from "./Native";
import { Build } from "./Build";

export type OpenOptions = {
  target?: string | undefined;
  features?:
    | {
        window?: string | undefined;
        /**
         * Only for Android
         */
        color?: string | undefined;
      }
    | undefined;
};

class OsClass extends Native {
  public constructor() {
    super(window.__os__);
  }

  public open(url?: string | URL | undefined, options?: OpenOptions): Window | null {
    if (this.isAndroid) {
      return this.interface.open(url, options?.features?.color || "#fffddd");
    } else {
      return window.open(url, options?.target, options?.features?.window);
    }
  }

  public hasStoragePermission(): boolean {
    if (this.isAndroid) {
      return this.interface.hasStoragePermission();
    } else {
      return true;
    }
  }

  public requestStoargePermission(): void {
    if (this.isAndroid) {
      this.interface.requestStoargePermission();
    } else {
      name;
    }
  }

  /**
   * Closes the window. On Android closes the App
   */
  public close(): void {
    this.isAndroid ? this.interface.close() : window.close();
  }

  public shareText(title: string, body: string): void {
    if (this.isAndroid) {
      this.interface.shareText(title, body);
    }
  }

  /**
   * Makes an toast, even on Android
   * @param text
   * @param duration
   */
  public toast(text: string, duration: "long" | "short"): void {
    const _duration = duration === "short" ? (this.isAndroid ? 0 : 2000) : this.isAndroid ? 1 : 5000;
    if (this.isAndroid) {
      this.interface.makeToast(text, _duration);
    } else {
      ons.notification.toast(text, { timeout: _duration, animation: "ascend" });
    }
  }

  /**
   * The SDK version of the software currently running on this hardware device.
   * @returns {number}
   */
  public get sdk(): number {
    if (this.isAndroid) {
      return this.interface.sdk();
    } else {
      return 40;
    }
  }

  public getMonetColor(id: string): string {
    if (this.isAndroid && this.sdk >= Build.VERSION_CODES.S) {
      return this.interface.getMonetColor(id);
    } else {
      return "#ffffff";
    }
  }

  /**
   * Get the current status bar height from the current device. Has an automatic fallback for browsers
   * @returns
   */
  public getStatusBarHeight(): number {
    if (this.isAndroid) {
      return this.interface.getStatusBarHeight() / 2;
    } else {
      return 0;
    }
  }

  // public getSafeAreaInsets(typr: "top" | "bottom"): number {
  //   if (this.isAndroid) {
  //     return this.interface.getSafeAreaInsets() / 2;
  //   } else {
  //     return 0;
  //   }
  // }

  /**
   * Changes the status bar color
   * @deprecated
   * @param color Your color
   * @param white `true` makes the status bar white
   */
  public setStatusBarColor(color: string, white: boolean = false): void {
    this.isAndroid ? this.interface.setStatusBarColor(color, white) : null;
  }

  /**
   * @deprecated
   * @param color
   */
  public setNavigationBarColor(color: string): void {
    this.isAndroid ? this.interface.setNavigationBarColor(color) : null;
  }

  public addNativeEventListener<K extends keyof WindowEventMap>(
    type: K,
    callback: () => void,
    options?: boolean | AddEventListenerOptions
  ): void {
    (window as any)[type] = new Event(type.toLowerCase());
    window.addEventListener(type.toLowerCase(), callback, options);
  }

  public removeNativeEventListener<K extends keyof WindowEventMap>(
    type: K,
    callback: () => void,
    options?: boolean | AddEventListenerOptions
  ): void {
    (window as any)[type] = new Event(type.toLowerCase());
    window.removeEventListener(type.toLowerCase(), callback, options);
  }

  public getSchemeParam(param: string): string {
    if (this.isAndroid) {
      return this.interface.getSchemeParam(param);
    } else {
      return new URLSearchParams(window.location.search).get(param) || "";
    }
  }
}

const os: OsClass = new OsClass();

export { os, OsClass };
