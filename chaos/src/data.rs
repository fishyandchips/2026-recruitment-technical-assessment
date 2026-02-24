use axum::{http::StatusCode, response::IntoResponse, Json};
use serde::{Deserialize, Serialize};
use serde_json::Value;

pub async fn process_data(Json(request): Json<DataRequest>) -> impl IntoResponse {
    let mut string_len = 0;
    let mut int_sum = 0;

    for val in &request.data {
        match val {
            Value::String(s) => string_len += s.len() as i32,
            Value::Number(n) => int_sum += n.as_i64().unwrap() as i32,
            _ => {}
        }
    }

    let response = DataResponse {
        string_len,
        int_sum,
    };

    (StatusCode::OK, Json(response))
}

#[derive(Deserialize)]
pub struct DataRequest {
    data: Vec<Value>,
}

#[derive(Serialize)]
pub struct DataResponse {
    string_len: i32,
    int_sum: i32,
}
