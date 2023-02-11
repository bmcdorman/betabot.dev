import construct from '@/ui/util/construct';
import IEasing from './IEasing';
import ILinearInterpolation from './ILinearInterpolation';

export namespace AnimationState {
  export const enum Type {
    Stopped,
    Playing
  }

  export interface Stopped {
    type: Type.Stopped;
  }

  export const STOPPED: Stopped = { type: Type.Stopped };

  export interface Playing {
    type: Type.Playing;
    startedAt: number;
  }

  export const playing = construct<Playing>(Type.Playing);
}

export type AnimationState = AnimationState.Stopped | AnimationState.Playing;

class Animation<T extends ILinearInterpolation<T>, E extends IEasing<T>> {

  private startedAt_: number;
  constructor(private easing_: E, private duration_: number) {
    this.startedAt_ = Date.now();
    console.log('Animation from ', this.easing_.start, ' to ', this.easing_.end, ' in ', this.duration_, 'ms', 'started at', this.startedAt_);
  }

  get easing(): E {
    return this.easing_;
  }

  get duration(): number {
    return this.duration_;
  }

  get value(): T {
    return this.easing_.ease((Date.now() - this.startedAt_) / this.duration_);
  }
}

export default Animation;