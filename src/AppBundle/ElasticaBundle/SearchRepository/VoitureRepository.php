<?php

namespace AppBundle\ElasticaBundle\SearchRepository;

use FOS\ElasticaBundle\Repository;

class VoitureRepository extends Repository
{

	public function searchKey($key){
		if($key){	
			$bool = new \Elastica\Query\Bool();

			$bool->addShould(new \Elastica\Query\Match('prix',$key));
			$bool->addShould(new \Elastica\Query\Match('kmParcouru',$key));
			$bool->addShould(new \Elastica\Query\Match('boitier.libelleBoitier',$key));
			$bool->addShould(new \Elastica\Query\Match('carburant.libelleCarburant',$key));
			$bool->addShould(new \Elastica\Query\Match('modeleMarque.modele.libelleModele',$key));
			$bool->addShould(new \Elastica\Query\Match('modeleMarque.marque.libelleMarque',$key));

			$query = \Elastica\Query::create($bool);
		}
		else{
			$match = new \Elastica\Query\MatchAll();

			$query = \Elastica\Query::create($match);
		}

		

		return $this->find($query);
	}
}
