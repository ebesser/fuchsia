class Card
	def initialize(rank, suit)
		# @rank = %w(Ace 2 3 4 5 6 7 8 9 10 Jack Queen King).sample
		# @suit = %w(Clubs Hearts Spades Diamonds).sample

		@rank = rank
		@suit = suit
	end

	def to_s 
		puts "#{@rank} of #{@suits}"
	end
end