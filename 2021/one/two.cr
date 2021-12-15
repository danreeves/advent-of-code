content = File.read("./input.txt")

prev = nil
curr = nil
count = 0

content.each_line.cons(3).each do |chunk|
  curr = chunk.map do |s|
    s.to_i
  end
  if prev && curr
    a = prev.reduce do |acc, i|
      acc + i
    end
    b = curr.reduce do |acc, i|
      acc + i
    end
    if curr > prev
      count = count + 1
    end
  end
  prev = curr
end

puts count
