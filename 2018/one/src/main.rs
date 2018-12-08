use std::collections::HashMap;
use std::env;
use std::fs;

fn main() {
    let mut args = env::args();
    if args.len() != 3 {
        println!("Usage: one [1|2] [filename]");
        return;
    }

    args.next();

    let task = args.next().unwrap();
    let filename = args.next().unwrap();
    let contents = fs::read_to_string(filename).unwrap();
    let input = contents
        .split('\n')
        .filter(|line| !line.is_empty())
        .map(|line| line.parse::<i64>().unwrap_or(0))
        .collect::<Vec<i64>>();

    let output = match task.as_ref() {
        "1" => task_1(input),
        "2" => task_2(input),
        _ => String::from(""),
    };

    println!("Result: {}", output);
}

fn task_1(input: Vec<i64>) -> String {
    let output = input.iter().fold(0, |acc, x| acc + x);
    format!("{}", output)
}

fn task_2(input: Vec<i64>) -> String {
    let mut double_input = input.clone();
    double_input.append(input.clone().as_mut());

    let mut acc = 0;
    let mut known_values: HashMap<i64, ()> = HashMap::new();
    let mut output: Option<i64> = None;
    let mut iterations = 0;

    while output.is_none() {
        iterations = iterations + 1;
        output = acc_til_dupe(&mut acc, &mut known_values, &input);
    }

    println!("Took {} iterations", iterations);
    format!("{}", output.unwrap())
}

fn acc_til_dupe(
    acc: &mut i64,
    known_values: &mut HashMap<i64, ()>,
    input: &Vec<i64>,
) -> Option<i64> {
    for i in input {
        *acc = *acc + i;
        let oldvalue = known_values.insert(*acc, ());
        if oldvalue.is_some() {
            return Some(acc.clone());
        }
    }
    None
}
