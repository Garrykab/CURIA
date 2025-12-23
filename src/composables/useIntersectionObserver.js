import { ref, onMounted, onUnmounted } from 'vue';

export const useIntersectionObserver = (options = {}) => {
  const elementRef = ref(null);
  const isIntersecting = ref(false);
  const hasIntersected = ref(false);

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options,
  };

  let observer = null;

  onMounted(() => {
    if (!elementRef.value) return;

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isIntersecting.value = entry.isIntersecting;
        if (entry.isIntersecting) {
          hasIntersected.value = true;
        }
      });
    }, defaultOptions);

    observer.observe(elementRef.value);
  });

  onUnmounted(() => {
    if (observer && elementRef.value) {
      observer.unobserve(elementRef.value);
      observer.disconnect();
    }
  });

  return {
    elementRef,
    isIntersecting,
    hasIntersected,
  };
};

