import { TodoPage } from '../../support/pages/TodoPage';

describe('TodoMVC Tests con POM', () => {
  const todo = new TodoPage();

  beforeEach(() => {
    todo.navigate();
  });

  it('1. Debe permitir crear una tarea', () => {
    todo.addTodo('Aprender Cypress');
    cy.get('.todo-list li').should('have.length', 1);
    cy.get('.todo-list li label').first().should('contain.text', 'Aprender Cypress');
  });

  it('2. Debe marcar una tarea como completada', () => {
    todo.addTodo('Tarea completada');
    todo.toggleTodo(0);
    cy.get('.todo-list li').eq(0).should('have.class', 'completed');
  });

  it('3. Debe desmarcar una tarea completada', () => {
    todo.addTodo('Tarea desmarcable');
    todo.toggleTodo(0);
    todo.toggleTodo(0);
    cy.get('.todo-list li').eq(0).should('not.have.class', 'completed');
  });

  it('4. Debe editar una tarea', () => {
    todo.addTodo('Viejo texto');
    todo.editTodo(0, 'Nuevo texto');
    cy.get('.todo-list li label').eq(0).should('have.text', 'Nuevo texto');
  });

  it('5. Debe borrar una tarea', () => {
    todo.addTodo('Eliminar esta tarea');
    todo.deleteTodo(0);
    cy.get('.todo-list li').should('have.length', 0);
  });

  it('6. Debe filtrar tareas (All / Active / Completed)', () => {
    todo.addTodo('Tarea A');  // activa
    todo.addTodo('Tarea B');  // completada
    todo.toggleTodo(1);

    // Filtrar ACTIVES
    todo.filterActive();
    cy.get('.todo-list li').should('have.length', 1);
    cy.get('.todo-list li label').first().should('have.text', 'Tarea A');

    // Filtrar COMPLETED
    todo.filterCompleted();
    cy.get('.todo-list li').should('have.length', 1);
    cy.get('.todo-list li label').first().should('have.text', 'Tarea B');

    // Filtrar ALL
    todo.filterAll();
    cy.get('.todo-list li').should('have.length', 2);
  });
});