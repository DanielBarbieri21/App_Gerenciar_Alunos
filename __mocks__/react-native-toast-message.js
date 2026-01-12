/**
 * Mock do react-native-toast-message para testes
 */

const ToastComponent = () => null;

ToastComponent.show = jest.fn();
ToastComponent.hide = jest.fn();
ToastComponent.success = jest.fn();
ToastComponent.error = jest.fn();
ToastComponent.info = jest.fn();

module.exports = ToastComponent;
