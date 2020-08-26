class Device {
  static isMobileDevice = () => {
    return 'ontouchstart' in window;
  };
}

export default Device;
