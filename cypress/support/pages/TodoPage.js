export class TodoPage {
  elements = {
    newTodoInput: () => cy.get('.new-todo'),
    todoItems: () => cy.get('.todo-list li'),
    todoLabel: (index) => cy.get('.todo-list li').eq(index).find('label'),
    toggleCheckbox: (index) => cy.get('.todo-list li').eq(index).find('.toggle'),
    destroyButton: (index) => cy.get('.todo-list li').eq(index).find('.destroy'),
    filterAll: () => cy.get('.filters a').contains('All'),
    filterActive: () => cy.get('.filters a').contains('Active'),
    filterCompleted: () => cy.get('.filters a').contains('Completed')
  };

  navigate() {
    cy.visit('https://todomvc.com/examples/react/dist/#/');
  }

  addTodo(text) {
    this.elements.newTodoInput().type(text + '{enter}');
  }

  toggleTodo(index) {
    this.elements.toggleCheckbox(index).click();
  }

  editTodo(index, newText) {
    this.elements.todoLabel(index).dblclick();
    cy.focused().clear().type(newText + '{enter}');
  }

  deleteTodo(index) {
    this.elements.todoItems().eq(index).trigger('mouseover');
    this.elements.destroyButton(index).click({ force: true });
  }

  filterAll() {
    this.elements.filterAll().click();
  }

  filterActive() {
    this.elements.filterActive().click();
  }

  filterCompleted() {
    this.elements.filterCompleted().click();
  }
}