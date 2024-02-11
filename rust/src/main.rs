use chrono::prelude::*;
fn main() {
    let local = Local::now();
    println!("Hello ASL!");
    print!("Current date: {}", local.format("%Y-%m-%d"));

}