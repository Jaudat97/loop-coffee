/**
 * 3D Testimonials Wall Parallax & Interactivity Engine — Coffee Loop
 * Standalone & zero dependencies (pure Vanilla JavaScript)
 *
 * @param {Object} options Configuration options
 * @param {string} [options.wrapperId='testimonialsWrapper'] - ID of outer wrapper
 * @param {string} [options.stageId='testimonialsStage'] - ID of 3D stage
 * @param {number} [options.tiltSensitivity=8] - Degrees of dynamic mouse tilt
 * @param {boolean} [options.pauseOnHover=true] - Pause marquee when cursor hovers
 */
function initTestimonials3D(options = {}) {
  const config = {
    wrapperId: options.wrapperId || 'testimonialsWrapper',
    stageId: options.stageId || 'testimonialsStage',
    tiltSensitivity: options.tiltSensitivity !== undefined ? options.tiltSensitivity : 8,
    pauseOnHover: options.pauseOnHover !== undefined ? options.pauseOnHover : true,
  };

  const wrapper = document.getElementById(config.wrapperId);
  const stage = document.getElementById(config.stageId);
  if (!wrapper || !stage) return;

  // Base 3D transformation values
  const baseRotateX = 18;
  const baseRotateY = -14;
  const baseRotateZ = 14;
  const baseTranslateX = -40;
  const baseTranslateY = -10;
  const baseTranslateZ = -50;

  // Mouse Parallax Effect on Desktop
  function handleMouseMove(e) {
    if (window.innerWidth <= 1024 || window.matchMedia('(hover: none)').matches) return;

    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    const rotX = baseRotateX - deltaY * config.tiltSensitivity;
    const rotY = baseRotateY + deltaX * config.tiltSensitivity;

    stage.style.transform = `translateX(${baseTranslateX}px) translateY(${baseTranslateY}px) translateZ(${baseTranslateZ}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${baseRotateZ}deg)`;
  }

  function handleMouseLeave() {
    if (window.innerWidth <= 1024 || window.matchMedia('(hover: none)').matches) return;
    stage.style.transform = `translateX(${baseTranslateX}px) translateY(${baseTranslateY}px) translateZ(${baseTranslateZ}px) rotateX(${baseRotateX}deg) rotateY(${baseRotateY}deg) rotateZ(${baseRotateZ}deg)`;
  }

  wrapper.addEventListener('mousemove', handleMouseMove);
  wrapper.addEventListener('mouseleave', handleMouseLeave);

  // Optional: Global Toggle 3D / Flat View
  window.toggleTestimonials3D = function (forceFlat) {
    if (forceFlat === undefined) {
      stage.classList.toggle('flat-view');
    } else if (forceFlat) {
      stage.classList.add('flat-view');
    } else {
      stage.classList.remove('flat-view');
    }
  };

  // Optional: Pause / Resume Marquee programmatically
  window.pauseTestimonialsMarquee = function (pause = true) {
    if (pause) {
      wrapper.classList.add('paused');
    } else {
      wrapper.classList.remove('paused');
    }
  };
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initTestimonials3D());
} else {
  initTestimonials3D();
}

// Export for module systems if present
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initTestimonials3D };
}
