/**
 * Mock do react-native-toast-message para testes
 */
const React = require('react');

const Toast = {
  show: jest.fn(),
  hide: jest.fn(),
  success: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
};

// Componente React válido que não renderiza nada
const ToastComponent = () => React.createElement('View', null);

// Adicionar métodos estáticos ao componente
ToastComponent.show = Toast.show;
ToastComponent.hide = Toast.hide;
ToastComponent.success = Toast.success;
ToastComponent.error = Toast.error;
ToastComponent.info = Toast.info;

module.exports = ToastComponent;
module.exports.default = ToastComponent;
