import { createReducer, on } from '@ngrx/store';
import * as actions from './todo.actions';
import { Todo } from './model/todo.model';

export const estadoInicial:Todo[] = [
  new Todo('Aprender rapido Angular'),
  new Todo('Aprender rapido node'),
  new Todo('Aprender rapido mongo'),
  new Todo('Aprender rapido React'),
  new Todo('Dejar de procrastinar'),
];

const _todoReducer = createReducer(estadoInicial,
  on(actions.crear, (state, {texto}) => [...state, new Todo( texto )] ),
  on(actions.toggle, (state, {id}) => {
      return state.map( todo => {
          if (todo.id === id ){
            return {
              ...todo,
              completado: !todo.completado
          }
        } else {
          return todo;
        }
      });
  }),
  on(actions.toggleall, (state, { completado}) => {
    return state.map( todo => {
          return {
            ...todo,
            completado: completado
      }
    });
}),
  on(actions.editar, (state, {id, texto}) => {
    return state.map( todo => {
        if (todo.id === id ){
          return {
            ...todo,
            texto: texto
        }
      } else {
        return todo;
      }
    });
  }),
  on(actions.borrar, (state, {id}) =>
    state.filter( todo => todo.id !== id )),
  on(actions.borrarCompletados, (state) =>
    state.filter( todo => !todo.completado )),
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
