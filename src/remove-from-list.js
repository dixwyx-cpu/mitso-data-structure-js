import { NotImplementedError } from '../extensions/index.js';

export default function removeKFromList(l, k) {
  while (l && l.value === k) {
    l = l.next;
  }
  let current = l;
  while (current && current.next) {
    if (current.next.value === k) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
  return l;
}
