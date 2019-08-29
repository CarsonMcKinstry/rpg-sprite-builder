import { query as performQuery } from "./db";
import { useState, useReducer, Reducer } from "react";
// @ts-ignore
import useEffect from "use-deep-compare-effect";
import { any } from "prop-types";

export function useQuery<V>(
  query: string,
  options: {
    variables?: V;
  }
) {
  const initialState = {
    loading: true,
    data: {},
    errors: []
  };
  const [queryState, dispatch] = useReducer<
    Reducer<
      {
        loading: boolean;
        data: any;
        errors: any[];
      },
      {
        type: string;
        payload?: any;
      }
    >
  >((state, action) => {
    switch (action.type) {
      case "START":
        return initialState;
      case "ERROR":
        return {
          ...state,
          errors: action.payload,
          loading: false,
          data: null
        };
      case "DATA":
        return {
          ...state,
          errors: [],
          loading: false,
          data: action.payload
        };
      default:
        return state;
    }
  }, initialState);

  useEffect(() => {
    dispatch({ type: "START" });
    performQuery(query, options.variables)
      .then(r => {
        const { errors } = r;
        if (errors) {
          throw errors;
        }
        return r;
      })
      .then(({ data }) => {
        dispatch({ type: "DATA", payload: data });
      })
      .catch(errors => dispatch({ type: "ERROR", payload: errors }));
  }, [query, options]); // eslint-disable-line

  return queryState;
}
