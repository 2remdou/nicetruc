<?php

namespace AppBundle\ElasticaBundle\SearchRepository;

use FOS\ElasticaBundle\Repository;
use AppBundle\ElasticaBundle\Model\AdvancedSearch;

class VoitureRepository extends Repository
{

	public function searchKey($key){
		if($key){	
			$bool = new \Elastica\Query\BoolQuery();

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

	public function searchAdvanced(AdvancedSearch $advancedSearch){

		if(!$advancedSearch->innerObjectIsDefine()){
			$match = new \Elastica\Query\MatchAll();
		}
		else{

			$match = new \Elastica\Query\BoolQuery();

			if($advancedSearch->getMarque()){
				$match->addMust(new \Elastica\Query\Match('modeleMarque.marque.id',$advancedSearch->getMarque()));
			}

			if($advancedSearch->getModele()){
				$match->addMust(new \Elastica\Query\Match('modeleMarque.modele.id',$advancedSearch->getModele()));
			}

			if($advancedSearch->getBoitier()){
				$match->addMust(new \Elastica\Query\Match('boitier.id',$advancedSearch->getBoitier()));
			}

			if($advancedSearch->getCarburant()){
				$match->addMust(new \Elastica\Query\Match('carburant.id',$advancedSearch->getCarburant()));
			}
		}


		$boolFilter = new \Elastica\Filter\BoolFilter();

		if($advancedSearch->getPrixMin()){
			$boolFilter->addMust(new \Elastica\Filter\Range('prix',array('gte'=>intval($advancedSearch->getPrixMin()))));
		}
		if($advancedSearch->getPrixMax()){
			$boolFilter->addMust(new \Elastica\Filter\Range('prix',array('lte'=>$advancedSearch->getPrixMax())));
		}
		if($advancedSearch->getKmMin()){
			$boolFilter->addMust(new \Elastica\Filter\Range('kmParcouru',array('gte'=>intval($advancedSearch->getKmMin()))));
		}
		if($advancedSearch->getKmMax()){
			$boolFilter->addMust(new \Elastica\Filter\Range('kmParcouru',array('lte'=>$advancedSearch->getKmMax())));
		}

		$filtered = new \Elastica\Query\Filtered($match,$boolFilter);


		$query = \Elastica\Query::create($filtered);

		return $this->find($query);
	}

}
