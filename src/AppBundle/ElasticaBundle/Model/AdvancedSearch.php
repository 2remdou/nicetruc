<?php

namespace AppBundle\ElasticaBundle\Model;


use Symfony\Component\HttpFoundation\Request;
/**
* 
*/
class AdvancedSearch
{

	protected $marque;

	protected $modele;

	protected $boitier;

	protected $carburant;

	protected $kmMin;

	protected $kmMax;

	protected $prixMin;

	protected $prixMax;


	public function handleRequest(Request $request)
	{
		$req = $request->request;

		if ($req->get('marque')) {
			$this->setMarque($req->get('marque'));
		}

		if ($req->get('modele')) {
			$this->setModele($req->get('modele'));
		}

		if ($req->get('boitier')) {
			$this->setBoitier($req->get('boitier'));
		}

		if ($req->get('carburant')) {
			$this->setCarburant($req->get('carburant'));
		}

		if ($req->get('prixMin')) {
			$this->setPrixMin($req->get('prixMin'));
		}

		if ($req->get('prixMax')) {
			$this->setPrixMax($req->get('prixMax'));
		}

		if ($req->get('kmMin')) {
			$this->setKmMin($req->get('kmMin'));
		}

		if ($req->get('kmMax')) {
			$this->setKmMax($req->get('kmMax'));
		}


	}


	public function getMarque()
	{
		return $this->marque;
	}

	public function setMarque($marque)
	{
		$this->marque = $marque;

		return $this;
	}

	public function getModele()
	{
		return $this->modele;
	}

	public function setModele($modele)
	{
		$this->modele = $modele;

		return $this;
	}

	public function getBoitier()
	{
		return $this->boitier;
	}

	public function setBoitier($boitier)
	{
		$this->boitier = $boitier;

		return $this;
	}

	public function getCarburant()
	{
		return $this->carburant;
	}

	public function setCarburant($carburant)
	{
		$this->carburant = $carburant;

		return $this;
	}

	public function getPrixMin()
	{
		return $this->prixMin;
	}

	public function setPrixMin($prixMin)
	{
		$this->prixMin = $prixMin;

		return $this;
	}

	public function getPrixMax()
	{
		return $this->prixMax;
	}

	public function setPrixMax($prixMax)
	{
		$this->prixMax = $prixMax;

		return $this;
	}


	public function getKmMin()
	{
		return $this->kmMin;
	}

	public function setKmMin($kmMin)
	{
		$this->kmMin = $kmMin;

		return $this;
	}


	public function getKmMax()
	{
		return $this->kmMax;
	}

	public function setKmMax($kmMax)
	{
		$this->kmMax = $kmMax;

		return $this;
	}

	public function innerObjectIsDefine()
	{
		if ($this->marque || $this->modele || $this->boitier || $this->carburant){
			return true;
		}

		return false;
	}
	

}
