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
  private state_: AnimationState = AnimationState.STOPPED;
  get state() {
    return this.state_;
  }
  
  constructor(private easing_: E, private duration_: number) {}

  get easing(): E {
    return this.easing_;
  }

  get duration(): number {
    return this.duration_;
  }

  play() {
    this.state_ = AnimationState.playing({ startedAt: performance.now() });
  }

  stop() {
    this.state_ = AnimationState.STOPPED;
  }

  get value(): T {
    if (this.state_.type === AnimationState.Type.Stopped) {
      return this.easing_.end;
    }

    const t = (performance.now() - this.state_.startedAt) / this.duration_;
    const ret = this.easing_.ease(t);

    if (t >= 1) {
      this.stop();
    }

    return ret;
  }
}

export default Animation;